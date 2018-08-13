import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import * as User from '../store/user'
import { connect } from 'react-redux'
import { ApplicationState } from '../store'
import Modal from 'react-responsive-modal'
import MiniCart from './Cart/MiniCart'

const imgSize = {
    height: '50px'
}

const marginTop = {
    marginTop: '18px',
}

const btnWidth = {
    width: '93%'
}

const modalLogout = {
    color: '#383838'
}

export class NavMenu extends React.Component<any, any>  {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            modalIsOpen: false
        }
    }

    componentDidMount() {
        // load user
        this.props.requestUser()
    }

    componentWillReceiveProps(props) {
        let self = this;
        self.setState({ user: props.user })
    }

    componentWillUnmount() {
        this.setState({
            modalIsOpen: false
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    navModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    public render() {
        const {
            user,
            modalIsOpen
        } = this.state

        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button onClick={this.navModal.bind(this)} type='button' className='navbar-toggle'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'} data-toggle="collapse" data-target=".in">
                        <div style={marginTop} className='pull-left'>PBF <strong>Supply</strong></div>
                        <div><img style={imgSize} className='pull-right hidden-md hidden-sm hidden-xs' src='./images/siteIcon.png' /></div>
                    </Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <div className='nav navbar-nav'>
                        <div className='text-center'>
                            <NavLink to={'/Items'} style={btnWidth} className='btn btn-primary'>
                                <b>Add items to cart</b>
                            </NavLink>
                            <NavLink to={'/UnitsOfIssue'} style={btnWidth} className='btn btn-secondary btn-highlight'>
                                Units of Issue
                            </NavLink>
                            <NavLink to={'/WhatsAnEmergency'} style={btnWidth} className='btn btn-secondary btn-highlight'>
                                What's an emergency order?
                            </NavLink>
                        </div>
                        <MiniCart />
                        <div className='accountcontainer'>
                            <div className="account">{user}</div>
                            <div className='logout'>
                                <NavLink to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn'>
                                    <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='col-md-12'>
                    <br />
                    <br />
                    <div className='text-center'>
                        <Link onClick={this.closeModal.bind(this)} to={'/Items'} style={btnWidth} className='btn btn-primary'>
                            <b>Add items to cart</b>
                        </Link>
                        <Link onClick={this.closeModal.bind(this)} to={'/'} style={btnWidth} className='btn btn-primary'>
                            View orders
                    </Link>
                        <Link onClick={this.closeModal.bind(this)} to={'/UnitsOfIssue'} style={btnWidth} className='btn btn-primary'>
                            Units of Issue
                    </Link>
                        <Link onClick={this.closeModal.bind(this)} to={'/WhatsAnEmergency'} style={btnWidth} className='btn btn-primary'>
                            What's an emergency order?
                    </Link>
                        <MiniCart closeModal={this.closeModal.bind(this)} />
                    </div>
                    <div className='accountcontainer'>
                        <div style={modalLogout} className="account">{user}</div>
                        <div style={modalLogout} className='logout'>
                            <NavLink style={modalLogout} to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn'>
                                <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                            </NavLink>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user
    }),
    ({
        ...User.actionCreators
    })
)(NavMenu as any) as typeof NavMenu;

