import React, { useState, useCallback, useEffect } from 'react';
import { getRecommend } from 'api/recommend';
import ProblemResult from './ProblemResult';
import { numToTierStr } from 'utils/tier';
import Switch from 'react-switch';
import {
  Input,
  Slider,
  Form,
  Button,
  Label,
  Title,
  ButtonWrapper,
  ErrorMsg,
  ProblemWrapper,
  Tag,
} from './style';
import { CommonTierImg } from 'style/commonStyle';

/**
 * 문제 추천 화면
 */
function ProblemRecommend() {
  const [bojId, setBojId] = useState('');
  const [startTier, setStartTier] = useState(0);
  const [endTier, setEndTier] = useState(4);
  const [problem, setProblem] = useState({});
  const [problemList, setProblemList] = useState({});
  const [idError, setIdError] = useState(false);
  const [tierMarks, setTierMarks] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [loadFlag, setLoadFlag] = useState(true);
  const [problemIdx, setProblemIdx] = useState(0);

  useEffect(() => {
    // 슬라이더에 마커 설정 (5 단위, 티어 색상이 변경될 때 마다 티어 이미지 삽입)
    const marks = [...Array(30)].map((_, i) => {
      if (i % 5 == 0)
        return (
          <CommonTierImg
            width={18}
            height={18}
            src={`https://static.solved.ac/tier_small/${i + 1}.svg`}
          />
        );
    });
    // 배열을 객체로 바꿈
    setTierMarks(
      marks.reduce((accumulator, value, index) => {
        return { ...accumulator, [index]: value };
      }, {}),
    );
  }, []);

  /**
   * 아이디 변경 핸들러
   */
  const onChangeId = useCallback((e) => {
    const id = e.target.value.trim();
    setBojId(id);
    // id 유효성 검사
    const regExp = /^[a-z0-9](?!_)[a-z0-9_]{1,19}$/g;
    setIdError(id == '' || !regExp.test(id));
    setLoadFlag(true);
  }, []);

  /**
   * 슬라이더 변경 핸들러
   */
  const onChangeSlider = useCallback((range) => {
    setLoadFlag(true);
    setStartTier(range[0]);
    setEndTier(range[1]);
  }, []);

  /**
   * 문제 목록 중 추천 문제를 지정한다.
   */
  useEffect(() => {
    if (problemList.length == 0) {
      setProblem({ id: 0 });
    } else if (problemList.length <= problemIdx) return;
    if (problemList.length > 0) {
      const newProblem = {
        id: problemList[problemIdx].problemId,
        title: problemList[problemIdx].titleKo,
        level: problemList[problemIdx].level,
        tags: problemList[problemIdx].tags,
      };
      setProblem(newProblem);
    }
  }, [problemIdx, problemList]);

  /**
   * 문제 추천 버튼 클릭 시 폼 제출 핸들러
   */
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // 아이디가 없는 경우
      if (bojId == '' || idError) {
        setIdError(true);
        return;
      }
      // 새로 로드하지 않아도 되는 경우
      if (!loadFlag && problemIdx + 1 < problemList.length) {
        setProblemIdx((prev) => prev + 1);
        return;
      }
      // 숫자로 설정된 티어를 문자열로 변경(1 -> b5)
      const startTierStr = numToTierStr(startTier);
      const endTierStr = numToTierStr(endTier);
      getRecommend(bojId, startTierStr, endTierStr)
        .then((res) => {
          if (res.status == 200 && res.data) {
            const { data } = res;
            setProblemList(data);
            setProblemIdx(0);
            setLoadFlag(false);
          }
          // 데이터 제대로 못 받았을 경우 에러처리
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    [bojId, startTier, endTier, loadFlag, problemIdx],
  );

  /**
   * 태그 숨기기 토글 버튼 핸들러
   */
  const onClickTagButton = useCallback(() => {
    setShowTags((prev) => !prev);
  }, []);

  return (
    <div>
      {/* 상단 제목 및 토글 버튼 */}
      <Title>
        <h2>오늘 뭐 풀지?</h2>
        <div>
          <span>Tags</span>
          <Switch
            onChange={onClickTagButton}
            checked={showTags}
            checkedIcon={false}
            uncheckedIcon={false}
            width={40}
            height={20}
            onColor="#69b5f8"
            offColor="#d2d2d2"
          />
        </div>
      </Title>

      {/* 아이디, 난이도 입력 폼 */}
      <Form onSubmit={onSubmitForm}>
        <div className="form-item">
          <Label>백준 아이디</Label>
          <Input
            value={bojId}
            onChange={onChangeId}
            placeholder="백준 아이디를 입력해주세요. 풀지 않은 문제를 추천해드립니다."
          />
          <ErrorMsg>
            {idError && <div>유효하지 않은 아이디입니다.</div>}
          </ErrorMsg>
        </div>
        <div className="form-item">
          <Label>
            <span>난이도</span>
            <CommonTierImg
              width={18}
              height={18}
              src={`https://static.solved.ac/tier_small/${startTier + 1}.svg`}
            />
            &nbsp;~&nbsp;
            <CommonTierImg
              width={18}
              height={18}
              src={`https://static.solved.ac/tier_small/${endTier + 1}.svg`}
            />
          </Label>
          <Slider
            range
            min={0}
            max={29}
            defaultValue={[0, 4]}
            allowCross={false}
            onChange={onChangeSlider}
            marks={tierMarks}
            trackStyle={{ backgroundColor: 'var(--color-toggle)' }}
          />
        </div>
        <ButtonWrapper>
          <Button>추천 받기</Button>
        </ButtonWrapper>
      </Form>

      {/* 추천된 문제 정보 */}
      <ProblemWrapper>
        <ProblemResult problem={problem} />
      </ProblemWrapper>
      {problem.tags && (
        <ProblemWrapper>
          {showTags && problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
        </ProblemWrapper>
      )}
    </div>
  );
}

export default ProblemRecommend;
