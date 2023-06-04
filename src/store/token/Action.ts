export type Action = {type:"ADD_TOKEN"; payload: string};

export const addToken = (token: string) : Action => ({
    type: "ADD_TOKEN",
    payload: token,
})
/*A ação propriamente dita, como exemplo uma tranferencia bancaria em si;*/