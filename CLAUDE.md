日本語で回答してください。

## コーディングスタイル

- ソースコードはなるべくモダンな書き方で書く

### 関数の定義

- **関数式を使用**: 関数宣言ではなく、関数式・アロー関数を使用する

```ts
// ❌ 関数宣言
function calculateTotal(items) {
  // ...
}

// ✅ アロー関数
const calculateTotal = (items) => {
  // ...
}
```

### 関数の引数

- **引数での分割代入を避ける**: 関数の引数では直接分割代入せず、関数内で展開する

```ts
// ❌ 引数での分割代入
const handleClick = ({ id, name }) => {
  // ...
}

// ✅ 関数内での分割代入
const handleClick = (params) => {
  const { id, name } = params
  // ...
}
```

### 型定義

- **type を使用**: 型定義には`interface`ではなく`type`を使用する

```ts
// ❌ interface
interface UserData {
  id: string
  name: string
}

// ✅ type
type UserData = {
  id: string
  name: string
}
```

### React コンポーネントの定義

- **FC 型を使用**: コンポーネントは`FC<Props>`形式で定義する

```ts
// ✅ 推奨される定義方法
const Component: FC<Props> = (props) => {
  const { foo } = props
  // ...
}
```
