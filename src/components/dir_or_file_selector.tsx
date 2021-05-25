import React, {ChangeEventHandler, DragEventHandler, MouseEventHandler} from 'react';

type Props = {
  name: string;
  value: string;
  onClickF: MouseEventHandler<HTMLButtonElement>;
  onClickD: MouseEventHandler<HTMLButtonElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
};

const DirOrFileSelector: React.FC<Props> = ({name, value, onClickF, onClickD, onChange, onDrop}) => {
  return (
    <div onDrop={onDrop}>
      <label>{name}</label>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={onClickF}>ファイルを選択</button>
      <button onClick={onClickD}>フォルダを選択</button>
    </div>
  );
};

export default DirOrFileSelector;
