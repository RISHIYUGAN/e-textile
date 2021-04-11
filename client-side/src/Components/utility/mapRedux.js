import { AuthChange,Authfalse,changePersonal } from "../../Redux/actions"

export const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth,
    personal: state.Dasbd,
  });

  export const mapDispatchToProps=(dispatch)=>({
    AuthChange:()=>dispatch(AuthChange()),
    Authfalse:()=>dispatch(Authfalse()),
    SwitchPersonal:()=>dispatch(changePersonal())
})
 