import React, {MouseEventHandler} from 'react';

type Props = {
  name: string;
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const DirOrFileSelector: React.FC<Props> = ({name, value, onClick}) => {
  return (
    <div>
      <label>{name}</label>
      <input type="text" value={value} />
      <button onClick={onClick}>選択</button>
    </div>
  );
};

export default DirOrFileSelector;
