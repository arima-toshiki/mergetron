import React from 'react';

type Props = {
  name: string;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DirOrFileSelector: React.FC<Props> = ({name, value, onValueChange}) => {
  return (
    <div>
      <label>{name}</label>
      <input type="file" onChange={onValueChange} value={value} />
    </div>
  );
};

export default DirOrFileSelector;
