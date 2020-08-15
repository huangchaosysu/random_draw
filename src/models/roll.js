export default {
  namespace: 'roll',
  state: {
    data: [
      {
        orgName: '一分队',
        staff: ['jim', 'jack', 'roy', 'tank', 'gun'],
        targets: ['jim'],
      },
      {
        orgName: '二分队',
        staff: ['jim', 'jack', 'roy', 'tank', 'gun'],
        targets: [],
      },
    ],
    title: '抽签仪式',
  }, // [{orgName: "", staff: ['jim', 'jack', 'roy', 'tank', 'gun'], targets: ['jim']}]
  effects: {
    *config({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { data: payload } });
    },
  },

  reducers: {
    save(state, payload) {
      return {
        ...state,
        data: payload.payload.data,
      };
    },
  },
};
