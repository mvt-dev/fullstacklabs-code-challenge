import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";
import nodesReducer, { checkNodeStatus, NodesState, getNodeBlocks } from "../reducers/nodes";

describe("Store", () => {
  const nodes = {
    list: [
      { url: "a.com", online: false, name: "", loading: false },
      { url: "b.com", online: false, name: "", loading: false },
      { url: "c.com", online: false, name: "", loading: false },
      { url: "d.com", online: false, name: "", loading: false },
    ],
  };

  let store: EnhancedStore<
    { nodes: NodesState },
    AnyAction,
    [
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, null>
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, undefined>
    ]
  >;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        nodes: nodesReducer,
      },
      preloadedState: { nodes },
    });
  });
  afterAll(() => {});

  it("should display results when necessary data is provided", () => {
    const actions = [
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "alpha" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "beta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "gamma" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[2] },
        payload: { node_name: "delta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "epsilon" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "zeta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "eta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "theta" },
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: [
          { attributes: { index: 1, data: "Matheus" }},
          { attributes: { index: 2, data: "Vieira" }},
        ],
      },
      {
        type: getNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[2] },
        payload: [
          { attributes: { index: 1, data: "Cristiane" }},
          { attributes: { index: 2, data: "Marques" }},
        ],
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        { url: "a.com", online: true, name: "theta", loading: false, blocks: [{ index: 1, data: "Matheus" }, { index: 2, data: "Vieira" }] },
        { url: "b.com", online: true, name: "epsilon", loading: false },
        { url: "c.com", online: true, name: "delta", loading: false, blocks: [{ index: 1, data: "Cristiane" }, { index: 2, data: "Marques" }] },
        { url: "d.com", online: false, name: "", loading: false },
      ],
    };

    expect(actual.nodes).toEqual(expected);
  });
});
