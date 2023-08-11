import React, { useState, useCallback } from 'react';
import { Input, Slider } from './style';

function ProblemRecommend() {
  const [bojId, setBojId] = useState('');
  const [startTier, setStartTier] = useState(0);
  const [endTier, setEndTier] = useState(0);

  const tier = ['b', 's', 'g', 'p', 'd', 'r'];

  const onChangeInput = useCallback((e) => {
    setBojId(e.target.value);
  }, []);

  const onChangeSlider = useCallback((range) => {
    setStartTier(range[0]);
    setEndTier(range[1]);
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const startTierStr = `${tier[parseInt(startTier / 5)]}${
        5 - (startTier % 5)
      }`;
      const endTierStr = `${tier[parseInt(endTier / 5)]}${5 - (endTier % 5)}`;
      // api 전송
    },
    [bojId],
  );

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <label>백준 ID</label>
        <Input value={bojId} onChange={onChangeInput} />
        <Slider
          range
          min={0}
          max={29}
          defaultValue={[0, 4]}
          allowCross={false}
          onChange={onChangeSlider}
          marks={{
            0: b5,
            5: s5,
            10: g5,
            15: p5,
            20: d5,
            25: r5,
          }}
        />
        <button>추천 받기</button>
      </form>
    </div>
  );
}

export default ProblemRecommend;
