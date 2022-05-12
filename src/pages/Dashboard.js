import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import AddPackage from '../components/Dashboard/AddPackage/AddPackage';
import AddService from '../components/Dashboard/AddService/AddService';
import Book from '../components/Dashboard/Book/Book';
import BookingList from '../components/Dashboard/BookingList/BookingList';
import '../components/Dashboard/Dashboard.css';
import DashboardLoader from '../components/Dashboard/DashboardLoader';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar/DashboardNavbar';
import MakeAdmin from '../components/Dashboard/MakeAdmin/MakeAdmin';
import ManagePackage from '../components/Dashboard/ManagePackage/ManagePackage';
import ManageService from '../components/Dashboard/ManageService/ManageService';
import OrderList from '../components/Dashboard/OrderList/OrderList';
import Payment from '../components/Dashboard/Payment/Payment';
import PaymentList from '../components/Dashboard/PaymentList/PaymentList';
import Profile from '../components/Dashboard/Profile/Profile';
import AddReview from '../components/Dashboard/Review/AddReview';
import Review, { EditReview } from '../components/Dashboard/Review/Review';
import ReviewLoader from '../components/Dashboard/Review/ReviewLoader';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const Dashboard = ({ adminLoading }) => {
    const { loggedInUser: { email }, isAdmin } = useContext(UserContext);
    const { panel } = useParams();
    const history = useHistory();
    const [showSidebar, setShowSidebar] = useState(false);
    const [loadingReview, setLoadingReview] = useState(true);
    const [review, setReview] = useState({});
    const [reviewEdit, setReviewEdit] = useState(false);

    if (
        !adminLoading && !isAdmin && (
            panel === "orderList" ||
            panel === "paymentList" ||
            panel === "addService" ||
            panel === "addPackage" ||
            panel === "makeAdmin" ||
            panel === "manageServices" ||
            panel === "managePackage" )
    ) {
        history.replace({ pathname: "/dashboard/profile" });
    }

    if (
        !adminLoading && isAdmin && (
            panel === "book" ||
            panel === "bookingList" ||
            panel === "review" ||
            panel === "payment")
    ) {
        history.replace({ pathname: "/dashboard/profile" });
    }

    useEffect(() => {
        axios.get(`https://pure-atoll-66880.herokuapp.com/reviews?email=${email}`)
            .then(res => {
                setReview(res.data);
                setLoadingReview(false);
            })
            .catch(error => toast.error(error.message))
    }, [email, reviewEdit, review])

    return (
        <main className="wrapper">
            <Sidebar show={showSidebar} adminLoading={adminLoading} />
            <div id="content">
                <DashboardNavbar setShowSidebar={setShowSidebar} show={showSidebar} />
                {
                    adminLoading ? <DashboardLoader />
                    : panel === "profile" ? <Profile />
                    : panel === "orderList" && isAdmin ? <OrderList />
                    : panel === "paymentList" && isAdmin ? <PaymentList />
                    : panel === "addService" && isAdmin ? <AddService />
                    : panel === "addPackage" && isAdmin ? <AddPackage />
                    : panel === "makeAdmin" && isAdmin ? <MakeAdmin />
                    : panel === "manageServices" && isAdmin ? <ManageService />
                    : panel === "managePackage" && isAdmin ? <ManagePackage />
                    : panel === "book" ? <Book />
                    : panel === "bookingList" ? <BookingList />
                    : panel === "payment" ?  <Payment/>
                    : panel === "review" && loadingReview ? <ReviewLoader />
                    : panel === "review" && review.name && !reviewEdit ? <Review review={review} setEdit={setReviewEdit} />
                    : panel === "review" && reviewEdit ? <EditReview review={review} edit={reviewEdit} setEdit={setReviewEdit} />
                    : panel === "review" ? <AddReview setReview={setReview} />
                    : null
                }
            </div>
        </main>
    );
};

export default Dashboard;