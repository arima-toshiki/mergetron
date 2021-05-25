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
  const cancelDefaultBehavior = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <div onDrop={onDrop} onDragOver={cancelDefaultBehavior}>
      <label>{name}</label>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={onClickF} onDragOver={cancelDefaultBehavior} onDrop={cancelDefaultBehavior}>
        ファイルを選択
      </button>
      <button onClick={onClickD} onDragOver={cancelDefaultBehavior} onDrop={cancelDefaultBehavior}>
        フォルダを選択
      </button>
    </div>
  );
};

export default DirOrFileSelector;
