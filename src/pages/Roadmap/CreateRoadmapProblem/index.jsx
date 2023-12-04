import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { ROADMAP_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';
import {
  BackButton,
  Container,
  ContentDiv,
  WeekInfo,
  ProblemList,
  WeekAddButton,
} from './style';
import { CommonTitle } from 'style/commonStyle';
import { toast } from 'react-toastify';
import ProblemCard from './ProblemCard';
import { isEmpty, cloneDeep } from 'lodash';
import { getProblemInfo } from 'api/problem';
import { createRoadmapProblem, deleteRoadmapProblem } from 'api/roadmap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/**
 * 로드맵 문제 편집 페이지
 */
function CreateRoadmapProblem() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: roadmapInfo } = useSWR(
    `${ROADMAP_PREFIX_URL}/search/?roadmapId=${id}`,
    fetcher,
  );

  // 로드맵 문제 정보
  const { data: allProblems, mutate: mutateProblems } = useSWR(
    `${ROADMAP_PREFIX_URL}/problem/search/all?roadmapId=${id}`,
    fetcher,
  );
  // 주차별 로드맵 문제 정보 가공
  const [problemInfo, setProblemInfo] = useState([]);
  useEffect(() => {
    if (!allProblems) return;
    if (isEmpty(allProblems)) {
      setProblemInfo([{ week: 1, problemList: [] }]);
      return;
    }
    const problems = allProblems.reduce((acc, cur) => {
      const { week, ...rest } = cur;
      if (!acc[week]) {
        acc[week] = { week, problemList: [rest] };
      } else {
        acc[week].problemList.push(rest);
      }
      return acc;
    }, {});
    setProblemInfo(Object.values(problems));
  }, [allProblems]);

  // 문제 추가
  const [inputProblemId, setInputProblemId] = useState({});
  const onChangeProblemId = (e, week) => {
    setInputProblemId((prev) => ({ ...prev, [week]: e.target.value }));
  };
  const requestAddProblem = useCallback((problemId, week, index) => {
    createRoadmapProblem({ roadmapId: id, problemId, week, index })
      .then(() => {
        mutateProblems();
        setInputProblemId((prev) => ({ ...prev, [week]: '' }));
      })
      .catch(() => {
        toast.error('문제를 추가하는데 실패하였습니다.');
      });
  }, []);
  const addProblem = useCallback(
    (week, index) => {
      const problemId = inputProblemId[week].toString();
      getProblemInfo({ problemId })
        .then((res) => {
          if (res.status == 200) {
            if (res.data) {
              requestAddProblem(problemId, week, index);
            }
          } else {
            toast.error('존재하지 않는 문제 입니다.');
          }
        })
        .catch(() => {
          toast.error('존재하지 않는 문제 입니다.');
        });
    },
    [inputProblemId],
  );

  // 문제 삭제
  const deleteProblem = useCallback(
    async (problemIdx, id) => {
      if (problemInfo[problemIdx].problemList.length == 1) {
        for (let i = problemIdx + 1; i < problemInfo.length; i++) {
          if (problemInfo[i].problemList.length > 0) {
            toast.error('중간에 빈 주차는 존재할 수 없습니다.');
            return;
          }
        }
      }
      deleteRoadmapProblem(id)
        .then(() => {
          mutateProblems();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [problemInfo],
  );

  // 드래그 앤 드롭으로 순서 변경 TODO: api 연동 필요
  const onDragEnd = ({ source, destination }, idx) => {
    if (!destination) return;
    const newProblemList = [...problemInfo[idx].problemList];
    // 기존 아이템을 새로운 위치에 삽입
    const [targetItem] = newProblemList.splice(source.index, 1);
    newProblemList.splice(destination.index, 0, targetItem);
    setProblemInfo((prev) => {
      const newProblemInfo = cloneDeep(prev);
      newProblemInfo[idx].problemList = [...newProblemList];
      return newProblemInfo;
    });
  };

  if (!roadmapInfo) return null;

  return (
    <Container>
      <BackButton
        size="25"
        onClick={() => {
          navigate(-1);
        }}
      />
      <CommonTitle>[{roadmapInfo.name}] 문제 설정</CommonTitle>
      <ContentDiv>
        {problemInfo.map((week, problemIdx) => (
          <WeekInfo key={week.week}>
            <label>{week.week}주차</label>
            <ProblemList>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const index = week.problemList.length + 1;
                  addProblem(week.week, index);
                }}
              >
                <input
                  placeholder="문제 번호를 입력해주세요."
                  value={inputProblemId.week}
                  onChange={(e) => {
                    onChangeProblemId(e, week.week);
                  }}
                />
                <button>추가</button>
              </form>
              <DragDropContext
                onDragEnd={(params) => {
                  onDragEnd(params, problemIdx);
                }}
              >
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <ProblemList
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {week.problemList.map((problem, i) => (
                        <Draggable
                          key={problem.id}
                          draggableId={problem.id.toString()}
                          index={i}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ProblemCard
                                order={i + 1}
                                problemInfo={problem}
                                deleteProblem={() => {
                                  deleteProblem(problemIdx, problem.id);
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ProblemList>
                  )}
                </Droppable>
              </DragDropContext>
            </ProblemList>
          </WeekInfo>
        ))}
      </ContentDiv>
      <WeekAddButton
        onClick={() => {
          if (problemInfo[problemInfo.length - 1].problemList.length <= 0) {
            toast.error('이전 주차 문제를 설정해주세요.');
            return;
          }
          setProblemInfo((prev) => [
            ...prev,
            { week: prev[prev.length - 1].week + 1, problemList: [] },
          ]);
        }}
      >
        다음 주차 추가 <div>+</div>
      </WeekAddButton>
    </Container>
  );
}

export default CreateRoadmapProblem;
