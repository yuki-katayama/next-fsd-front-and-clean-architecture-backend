  /**
   * 各プロパティの状態を変更する関数
   */
  export const handleTodoChange = <T extends { [key: string]: any }>(
    setter: React.Dispatch<React.SetStateAction<any>>,
    // setter: React.Dispatch<React.SetStateAction<T>>, // TODO: IUpdateTodoDto | nullでnullを許容しないよう修正
    property: keyof T,
    todo: T,
    value: any
  ) => {
    setter({
      ...todo,
      [property]: value  // 特定のプロパティを更新
    });
  }