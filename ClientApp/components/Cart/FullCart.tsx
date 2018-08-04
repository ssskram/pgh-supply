import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Modal from 'react-responsive-modal'
import * as Cart from '../../store/cart'
import { Redirect } from 'react-router-dom'
import { Helmet } from "react-helmet"
import SelectQuantity from './EnterQuantity'
import DeleteItem from './DeleteItems'
import Table from "react-table"
import Submit from './Submit'

const fixedHeight = {
    height: '225px',
}

const paddingLeft = {
    paddingLeft: '25px'
}

const paddingRight = {
    paddingRight: '25px'
}

const cartIcon = {
    paddingLeft: '15px',
    fontSize: '5em',
}

const submitButton = {
    fontSize: '22px',
    marginTop: '15px'
}

const btnStyle = {
    width: '250px'
}

const qtyColor = {
    color: '#449d44'
}

const columns = [{
    Header: 'Item',
    accessor: 'obj'
}, {
    Header: 'Type',
    accessor: 'family'
}, {
    Header: 'Unit',
    accessor: 'unit'
}, {
    Header: 'Quantity',
    accessor: 'quantityOrdered'
}]

export class FullCart extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            selectedItem: {},
            updateType: '',
            emergencyOrder: false,
            house: '',
            submitted: false
        }
    }

    componentDidMount() {
        this.props.loadCart()
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            selectedItem: {},
            updateType: ''
        });
    }

    deleteItem(item) {
        this.setState({
            modalIsOpen: true,
            selectedItem: item,
            updateType: 'delete'
        })
    }

    updateQuantity(item) {
        this.setState({
            modalIsOpen: true,
            selectedItem: item,
            updateType: 'quantity'
        })
    }

    confirmCart() {
        this.setState({
            modalIsOpen: true,
            updateType: 'confirm'
        })
    }

    submitIt() {
        this.setState({
            updateType: 'submit'
        })
    }

    goHome() {
        this.setState({
            submitted: true
        })
    }

    public render() {
        const {
            cart
        } = this.props

        const {
            modalIsOpen,
            selectedItem,
            updateType,
            submitted
        } = this.state

        if (submitted == true) {
            return <Redirect to='/' />;
        }

        if (cart.length == 0) {
            return <Redirect to='/Items' />;
        }

        const houseSupplies = cart.filter(item => item.family == 'House')
        const renderHouse = houseSupplies.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.obj}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3 style={qtyColor}><b>{item.quantityOrdered}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const officeSupplies = cart.filter(item => item.family == 'Office')
        const renderOffice = officeSupplies.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.obj}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3 style={qtyColor}><b>{item.quantityOrdered}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const medicalSupplies = cart.filter(item => item.family == 'Medical')
        const renderMedical = medicalSupplies.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.obj}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3 style={qtyColor}><b>{item.quantityOrdered}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const medicine = cart.filter(item => item.family == 'Medicine')
        const renderMedicine = medicine.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.obj}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3 style={qtyColor}><b>{item.quantityOrdered}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const equipment = cart.filter(item => item.family == 'Equipment')
        const renderEquipment = equipment.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.obj}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3 style={qtyColor}><b>{item.quantityOrdered}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const miscellaneous = cart.filter(item => item.family == 'Miscellaneous')
        const renderMiscellaneous = miscellaneous.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.obj}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3 style={qtyColor}><b>{item.quantityOrdered}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        return <div>
            <Helmet>
                <style>{'body { background-color: rgba(92, 184, 92, .05); }'}</style>
            </Helmet>
            <div className='col-md-12'>
                <div className='row'>
                    <span style={cartIcon} className='glyphicon glyphicon-shopping-cart pull-left'></span>
                    <button style={submitButton} onClick={this.confirmCart.bind(this)} className='btn btn-success pull-right'><b>Submit order</b></button>
                </div>
                <br />
                {houseSupplies.length > 0 &&
                    <div className='row'>
                        <div className='d-flex justify-content-between'>
                            <h2 style={paddingLeft}>House supplies<span style={paddingRight} className='glyphicon glyphicon-home pull-right'></span></h2>
                        </div>
                        <hr />
                        <div className='col-md-12'>
                            {renderHouse}
                        </div>
                    </div>
                }
                {officeSupplies.length > 0 &&
                    <div className='row'>
                        <h2 style={paddingLeft}>Office supplies<span style={paddingRight} className='glyphicon glyphicon-folder-open pull-right'></span></h2>
                        <hr />
                        <div className='col-md-12'>
                            {renderOffice}
                        </div>
                    </div>
                }
                {medicalSupplies.length > 0 &&
                    <div className='row'>
                        <h2 style={paddingLeft}>Medical supplies<span style={paddingRight} className='glyphicon glyphicon-plus-sign pull-right'></span></h2>
                        <hr />
                        <div className='col-md-12'>
                            {renderMedical}
                        </div>
                    </div>
                }
                {medicine.length > 0 &&
                    <div className='row'>
                        <h2 style={paddingLeft}>Medicine<span style={paddingRight} className='glyphicon glyphicon-grain pull-right'></span></h2>
                        <hr />
                        <div className='col-md-12'>
                            {renderMedicine}
                        </div>
                    </div>
                }
                {equipment.length > 0 &&
                    <div className='row'>
                        <h2 style={paddingLeft}>Equipment<span style={paddingRight} className='glyphicon glyphicon-wrench pull-right'></span></h2>
                        <hr />
                        <div className='col-md-12'>
                            {renderEquipment}
                        </div>
                    </div>
                }
                {miscellaneous.length > 0 &&
                    <div className='row'>
                        <h2 style={paddingLeft}>Miscellaneous<span className='pull-right' style={paddingRight}><b>?</b></span></h2>
                        <hr />
                        <div className='col-md-12'>
                            {renderMiscellaneous}
                        </div>
                    </div>
                }
                <br />
                <br />
                <br />
            </div>
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                {updateType == 'quantity' &&
                    <SelectQuantity closeModal={this.closeModal.bind(this)} item={selectedItem} put={true} />
                }
                {updateType == 'delete' &&
                    <DeleteItem closeModal={this.closeModal.bind(this)} item={selectedItem} />
                }
                {updateType == 'confirm' &&
                    <div className='col-md-12 text-center'>
                        <br />
                        <h2>Is this everything?</h2>
                        <Table
                            data={cart}
                            columns={columns}
                            loading={false}
                            minRows={0}
                            showPagination={false}
                            noDataText=''
                            getTdProps={() => ({
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }
                            })}
                            defaultSorted={[
                                {
                                    id: 'family',
                                    asc: true
                                }
                            ]} />
                        <br />
                        <button style={btnStyle} onClick={this.submitIt.bind(this)} className='btn btn-success'>Yes</button>
                    </div>
                }
                {updateType == 'submit' &&
                    <Submit cart={cart} GoHome={this.goHome.bind(this)}/>
                }
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.cart,
    }),
    ({
        ...Cart.actionCreators,
    })
)(FullCart as any) as typeof FullCart;