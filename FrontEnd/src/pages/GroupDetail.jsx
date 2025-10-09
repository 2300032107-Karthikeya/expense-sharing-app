// src/pages/GroupDetail.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apiClient from '../services/api';

const GroupDetail = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [balances, setBalances] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [expenseMessage, setExpenseMessage] = useState('');

    // Member form state
    const [selectedUserId, setSelectedUserId] = useState('');

    // Expense form state
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [paidByUserId, setPaidByUserId] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const [groupRes, expensesRes, balancesRes, usersRes] = await Promise.all([
                apiClient.get(`/groups/${groupId}`),
                apiClient.get(`/expenses/group/${groupId}`),
                apiClient.get(`/groups/${groupId}/balances`),
                apiClient.get('/users')
            ]);
            
            setGroup(groupRes.data);
            setExpenses(expensesRes.data);
            setBalances(balancesRes.data);
            setAllUsers(usersRes.data);

            if (groupRes.data.members && groupRes.data.members.length > 0) {
                setPaidByUserId(groupRes.data.members[0].userId);
            }

        } catch (error) {
            console.error("Error fetching group data:", error);
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!selectedUserId) {
            setMessage("Please select a user.");
            return;
        }
        setMessage('');
        try {
            await apiClient.post(`/groups/${groupId}/addUser/${selectedUserId}`);
            setMessage("Member added successfully!");
            setSelectedUserId(''); // Reset dropdown
            fetchData(); // Refresh all data
        } catch (error) {
            setMessage(error.response?.data || "Failed to add member.");
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        setExpenseMessage('');
        try {
            await apiClient.post('/expenses', {
                title: expenseTitle,
                amount: parseFloat(expenseAmount),
                paidByUserId: parseInt(paidByUserId),
                groupId: parseInt(groupId)
            });
            setExpenseMessage('Expense added successfully!');
            setExpenseTitle('');
            setExpenseAmount('');
            fetchData(); 
        } catch (error) {
            setExpenseMessage(error.response?.data || "Failed to add expense.");
        }
    };

    if (loading) {
        return <div><Navbar /><div className="container mt-4"><p>Loading...</p></div></div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="mb-3">
                    <Link to="/dashboard">&larr; Back to Dashboard</Link>
                </div>
                <h2>{group.name}</h2>
                <p>{group.description}</p>
                <hr />

                {/* EXPENSE SECTION */}
                <div className="row mb-5">
                    <div className="col-md-8">
                        <h4>Group Balances</h4>
                        <ul className="list-group mb-4">
                            {Object.entries(balances).map(([userName, balance]) => (
                                <li key={userName} className="list-group-item d-flex justify-content-between">
                                    {userName}
                                    <span className={`badge ${balance >= 0 ? 'bg-success' : 'bg-danger'}`}>
                                        {balance >= 0 ? 'Gets back' : 'Owes'} ${Math.abs(balance).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <h4>Expenses</h4>
                        <ul className="list-group">
                          {expenses.length > 0 ? expenses.map(expense => (
                            <li key={expense.id} className="list-group-item">{expense.title} (${expense.amount.toFixed(2)}) - Paid by {expense.paidBy.name}</li>
                          )) : <p>No expenses yet.</p>}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4>Add New Expense</h4>
                        <form onSubmit={handleAddExpense}>
                            {expenseMessage && <div className="alert alert-info">{expenseMessage}</div>}
                            <div className="mb-3"><label>Title</label><input type="text" className="form-control" value={expenseTitle} onChange={e => setExpenseTitle(e.target.value)} required /></div>
                            <div className="mb-3"><label>Amount ($)</label><input type="number" step="0.01" className="form-control" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} required /></div>
                            <div className="mb-3"><label>Paid By</label><select className="form-select" value={paidByUserId} onChange={e => setPaidByUserId(e.target.value)} required>{group?.members.map(member => (<option key={member.userId} value={member.userId}>{member.name}</option>))}</select></div>
                            <button type="submit" className="btn btn-primary w-100">Add Expense</button>
                        </form>
                    </div>
                </div>

                <hr/>

                {/* MEMBER SECTION */}
                <div className="row mt-5">
                    <div className="col-md-8">
                        <h4>Members</h4>
                        <ul className="list-group">
                            {group.members.map(member => (
                                <li key={member.userId} className="list-group-item">{member.name} ({member.email})</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4>Add Member to Group</h4>
                        <form onSubmit={handleAddMember}>
                            {message && <div className="alert alert-info">{message}</div>}
                            <div className="input-group mb-3">
                                <select className="form-select" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                                    <option value="">Choose a user...</option>
                                    {allUsers.map(user => (
                                        <option key={user.userId} value={user.userId}>{user.name}</option>
                                    ))}
                                </select>
                                <button className="btn btn-outline-secondary" type="submit">Add Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupDetail;