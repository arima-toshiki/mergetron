import React, {ChangeEventHandler, MouseEventHandler} from 'react';

type Props = {
  name: string;
  value: string;
  onClickF: MouseEventHandler<HTMLButtonElement>;
  onClickD: MouseEventHandler<HTMLButtonElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const DirOrFileSelector: React.FC<Props> = ({name, value, onClickF, onClickD, onChange}) => {
  return (
    <div>
      <label>{name}</label>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={onClickF}>ファイルを選択</button>
      <button onClick={onClickD}>フォルダを選択</button>
    </div>
  );
};

export default DirOrFileSelector;
