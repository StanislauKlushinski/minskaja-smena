declare const browserEvent: {
  getModel: (id: number) => Promise<string>
  getIds: () => Promise<string>
} | undefined