import React, {Component} from 'react';
import Catalog from "./CatalogComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import ItemDetail from "./ItemdetailComponent";
import About from "./AboutComponent";
import {connect} from "react-redux";
import {addComment, fetchComments, fetchItems, postComment} from "../redux/ActionCreators";
import {actions} from "react-redux-form";

// de redux al componente
const mapStateToProps = (state) => {
    return {
        items: state.items,
        employees: state.employees,
        comments: state.comments
    }
};

// del componente a redux
const mapDispatchToProps = dispatch => ({
    addComment: (itemId, rating, author, comment) => dispatch(addComment(itemId, rating, author, comment)),
    fetchItems: () => dispatch(fetchItems()),
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'))
    },
    fetchComments: () => dispatch(fetchComments()),
    postComment: (itemId, rating, author, comment) => dispatch(postComment(itemId, rating, author, comment))
});

class Main extends Component {

    constructor(props, context) {
        super(props, context);
        console.log("Main constructor es invocado");
    }

    componentDidMount() {
        this.props.fetchItems();
        this.props.fetchComments();
    }

    render() {
        const ItemWithId = ({match}) => {
            return (
                <ItemDetail
                    item={this.props.items.items.filter((item) => item.id === parseInt(match.params.itemId, 10))[0]}
                    itemsLoading={this.props.items.isLoading}
                    itemsErrMess={this.props.items.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.itemId === parseInt(match.params.itemId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        };

        const HomePage = () => {
            return (
                <Home
                    item={this.props.items.items.filter(item => item.featured)[0]}
                    itemsLoading={this.props.items.isLoading}
                    itemsErrMess={this.props.items.errMess}
                    employee={this.props.employees.filter(employee => employee.featured)[0]}
                />
            );
        };

        console.log("Main render es invocado");
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route path='/contactus'
                           component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                    <Route path='/aboutus' component={() => <About employees={this.props.employees}/>}/>
                    <Route exact path='/catalog' component={() => <Catalog items={this.props.items}/>}/>
                    <Route path='/catalog/:itemId' component={ItemWithId}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
