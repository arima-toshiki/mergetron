import React, {useMemo, useCallback} from 'react';

// 親コンポーネントから渡されるプロパティを定義する
interface IProps {
  /** ラベル文字列 */
  label: string;
  /** テキストボックスのタイプ */
  type: 'text' | `password`;
  /** テキストボックスに表示する値 */
  value: string;
  /** 値の確定時にその値を親プロパティが取得するためにコールバック関数を提供する */
  onChangeText: (value: string) => void;
}

// eslint-disable-next-line valid-jsdoc
/**
 * ラベル付きのテキストボックスを提供する
 */
const TextBox: React.FC<IProps> = (props) => {
  // ラベルコンポーネントをメモ化して毎回判定しないようにする
  const label = useMemo(() => {
    // ラベルが設定されていない場合は、 label を出力しない
    return props.label ? <label>{props.label}</label> : null;
  }, [props.label]);
  const onValueChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        props.onChangeText(value);
      },
      [props.onChangeText],
  );
  return (
    <span>
      {label}
      <input name="username" type={props.type} value={props.value} onChange={onValueChange} />
    </span>
  );
};

export default TextBox; // 他のファイルから参照できるようにする。
