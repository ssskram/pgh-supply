import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as userProfile from '../../store/userProfile'
import * as user from '../../store/user'
import * as types from '../../store/types'
import TextArea from '../formElements/textarea'
import Select from '../formElements/select'
import Modal from 'react-responsive-modal'
import * as selects from './selects'
import SubmitIt from './submit'

type props = {
    user?: types.user
    userProfile?: types.userProfile
    updateCart?: (newProfile) => void
    closeForm: () => void
}

export class FormFields extends React.Component<props, any> {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            miscItems: '',
            comments: '',
            emergencyOrder: false,
            emergencyJustification: '',
            narcanCases: true,
            narcanAdministeredUnknown: ''
        }
    }

    doesOrderContainNarcan() {
        return true
    }

    placeOrder() {
        const newOrder = {
            _id: '...loading',
            user: this.props.user.email,
            name: this.props.user.name,
            department: this.props.userProfile.department,
            location: this.state.location.value,
            comments: this.state.comments,
            emergencyOrder: this.state.emergencyOrder.value,
            emergencyJustification: this.state.emergencyJustification,
            narcanCases: this.state.narcanCases.value,
            narcanAdministeredUnknown: this.state.narcanAdministeredUnknown,
            miscItems: this.state.miscItems,
            items: this.props.userProfile.cart
        }
        console.log(newOrder)
        // add order
        // await confirmation
        // return confirmationas true/false success
        return true
    }

    render() {
        const {
            location,
            miscItems,
            comments,
            emergencyOrder,
            emergencyJustification,
            narcanCases,
            narcanAdministeredUnknown
        } = this.state

        return (
            <Modal
                open={true}
                onClose={() => this.props.closeForm()}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                showCloseIcon={true}
                center>
                <div className='col-md-12'>
                    <h4 className='text-center'><b>ORDER INFO</b></h4>
                    {this.doesOrderContainNarcan() &&
                        <div className='col-md-12' style={{ backgroundColor: 'rgba(154, 66, 4, .1)', padding: '10px 0px', margin: '10px 0px', borderRadius: '5px' }}>
                            <h5 className='text-center'><b>NARCAN</b></h5>
                            <Select
                                value={narcanCases}
                                header='Do you have the cases?'
                                placeholder='Yes or no'
                                onChange={narcanCases => this.setState({ narcanCases })}
                                multi={false}
                                options={selects.YesNo}
                                required
                            />
                            <TextArea
                                value={narcanAdministeredUnknown}
                                header="If amount administered is unknown, please explain why"
                                placeholder="Explanation"
                                callback={e => this.setState({ narcanAdministeredUnknown: e.target.value })}
                            />
                        </div>
                    }
                    <Select
                        value={location}
                        header='Select location for delivery'
                        placeholder='Select House'
                        onChange={location => this.setState({ location })}
                        multi={false}
                        options={selects.FireHouses}
                        required
                    />
                    <TextArea
                        value={miscItems}
                        header="Do you need anything else?"
                        placeholder="Couldn't find what you were looking for?"
                        callback={e => this.setState({ miscItems: e.target.value })}
                    />
                    <div className='col-md-12' style={emergencyOrder.value ? { backgroundColor: 'rgba(220, 53, 69, .1)', padding: '10px 0px', borderRadius: '5px', margin: '10px 0px' } : { padding: '0px 0px', borderRadius: '5px', margin: '0px 0px' }}>
                        <Select
                            value={emergencyOrder}
                            header='Is this an emergency?'
                            placeholder='Yes or no'
                            onChange={emergencyOrder => this.setState({ emergencyOrder })}
                            multi={false}
                            options={selects.YesNo}
                            required
                        />
                        {emergencyOrder.value &&
                            <TextArea
                                value={emergencyJustification}
                                header="Emergency Justification"
                                placeholder="Please explain why this is an emergency"
                                callback={e => this.setState({ emergencyJustification: e.target.value })}
                            />
                        }
                    </div>
                    <TextArea
                        value={comments}
                        header="Additional comments"
                        placeholder="Anything else we need to know?"
                        callback={e => this.setState({ comments: e.target.value })}
                    />
                    <SubmitIt
                        submitIt={this.placeOrder.bind(this)}
                        closeForm={() => this.props.closeForm()}
                    />
                </div>
            </Modal>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile,
        ...state.user
    }),
    ({
        ...userProfile.actionCreators,
        ...user.actionCreators
    })
)(FormFields)