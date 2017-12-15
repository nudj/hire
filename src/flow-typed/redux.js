declare type Action = {
  type: string
}

declare type Dispatch = (action: Action | Promise<Action>) => Promise<any>
