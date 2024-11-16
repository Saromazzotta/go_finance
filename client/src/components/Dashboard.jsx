import LoggedInNavBar from "./LoggedInNavBar"


const Dashboard = () => {
    // const [users, setUsers] = useState([]);




    return (
        <div>
            <LoggedInNavBar />

            

            <div className="container my-4">
                <div className="row">
                    <div className="cold-md-3">
                        <div className="card">
                            <div className="card-header bg-success text-white">Quick Actions</div>
                            <div className="list-group list-group flush">
                                <a href="" className="list-group-item list-group-item-action">Add Transaction</a>
                                <a href="" className="list-group-item list-group-item-action">View Transactions</a>
                                <a href="" className="list-group-item list-group-item-action">Generate Report</a>
                            </div>


                            <div className="cold-md-9">
                                <div className="card">
                                    <div className="card-header bg-success text-white">Transaction List</div>
                                    <div className="card-body">
                                        <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addTransactionModal">Add Transaction</button>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Description</th>
                                                    <th>Amount</th>
                                                    <th>Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <button className="btn btn-sm btn-warning">Edit</button>
                                                        <button className="btn btn-sm btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="addTransactionModal" tabIndex="1" aria-labelledby="addTransactionModalLabel"  aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="addTransactionModalLabel">Transaction</h5>
                                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form action="">
                                                <div className="mb-3">
                                                    <label htmlFor="description" className="form-label">Description</label>
                                                    <input type="text" className="form-contrtol" id="description" placeholder="Enter transaction"/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="amount" className="form-label">Amount</label>
                                                    <input type="number" className="form-control" id="amount" placeholder="Enter amount" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date" className="form-label">Date</label>
                                                    <input type="date" className="form-control" id="date" />
                                                </div>
                                                <button className="btn btn-primary">Save</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}


export default Dashboard