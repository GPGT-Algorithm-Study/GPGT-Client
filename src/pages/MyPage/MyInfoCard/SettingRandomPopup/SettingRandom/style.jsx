import styled from '@emotion/styled';

export const DifficultyDiv = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

export const DifficultyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EditButton = styled.div`
  border: none;
  padding: 1rem;
  background-color: var(--color-primary);
  margin-top: 20px;
  border-radius: 5px;
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  box-sizing: border-box;
  width: 8rem;
  cursor: pointer;
  align-self: flex-end;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

export const SliderWrapper = styled.div`
  padding: 0 10px;
`;

export const SwitchWrapper = styled.div`
  font-weight: normal;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: var(--color-deep-gray);
  gap: 0.5rem;
  margin-top: 1.5rem;
  > span {
    margin-top: -2px;
  }
`;

export const InfoWRapper = styled.span`
  display: flex;
  align-items: start;
  margin-top: 1px;
`;

export const SettingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const NoDifficulty = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text-gray);
  text-align: start;
`;
