import React, {ChangeEventHandler, MouseEventHandler} from 'react';

type Props = {
  name: string;
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const DirOrFileSelector: React.FC<Props> = ({name, value, onClick, onChange}) => {
  return (
    <div>
      <label>{name}</label>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={onClick}>選択</button>
    </div>
  );
};

export default DirOrFileSelector;
