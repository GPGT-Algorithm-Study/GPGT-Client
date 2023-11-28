import React, { useCallback } from 'react';
import { InputForm, StyledMentionsInput, MentionWrapper } from './style';
import { Mention } from 'react-mentions';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { USER_PREFIX_URL } from 'utils/constants';

/**
 * 멘션 가능한 인풋 컴포넌트
 */
function MentionInput({ onSubmitComment, commentContent, onChangeComment }) {
  const { data: mentionList } = useSWR(
    `${USER_PREFIX_URL}/mention/list`,
    fetcher,
  );

  const renderUserSuggestion = useCallback(
    (suggestion, search, highlightedDisplay, index, focus) => {
      if (!mentionList) return null;
      return (
        <MentionWrapper focus={focus}>
          <span>{highlightedDisplay}</span>
        </MentionWrapper>
      );
    },
    [mentionList],
  );

  const onKeyDownComment = useCallback(
    (e) => {
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        e.nativeEvent.isComposing === false
      ) {
        onSubmitComment(e);
      }
    },
    [onSubmitComment],
  );

  return (
    <div>
      <InputForm onSubmit={onSubmitComment}>
        <StyledMentionsInput
          placeholder="댓글 내용을 입력하세요"
          value={commentContent}
          onChange={onChangeComment}
          onKeyDown={onKeyDownComment}
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={
              mentionList?.map((user) => ({
                id: user.notionId,
                display: user.notionId,
              })) || []
            }
            renderSuggestion={renderUserSuggestion}
          />
        </StyledMentionsInput>
        <button>확인</button>
      </InputForm>
    </div>
  );
}

export default MentionInput;
