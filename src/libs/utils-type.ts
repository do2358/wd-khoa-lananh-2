export type GetProps<T extends React.ComponentType<any> | object> = T extends React.Context<infer CP> ? CP : T extends React.ComponentType<infer P> ? P : T extends object ? T : never;
