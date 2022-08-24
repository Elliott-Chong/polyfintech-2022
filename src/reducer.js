const initialState = {
  alerts: [],
  user: null,
  loading: true,
  certificates: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOADING":
      return { ...state, loading: payload };

    case "SET_ALERT":
      let newAlerts = state.alerts;
      window.scrollTo({ top: 0, behavior: "smooth" });
      newAlerts.push({ id: payload.id, type: payload.type, msg: payload.msg });
      return {
        ...state,
        alerts: newAlerts,
      };
    case "REMOVE_ALERT":
      let newAlertss = state.alerts.filter((alert) => alert.id !== payload.id);
      return { ...state, alerts: newAlertss };
    case "SET_TOKEN":
      localStorage.setItem("token", payload);
      break;
    case "SET_USER":
      return { ...state, user: payload };
    case "CLEAR_USER":
      localStorage.removeItem("token");
      return { ...state, user: null };
    default:
      return state;
  }
};

export { initialState, reducer };
