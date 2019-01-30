import React from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import CommentForm from "./CommentFormComponent";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";


function RenderItem({item}) {
    if (item != null) {
        return (
            <Card>
                <CardImg width="100%" src={baseUrl + item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );

    } else {
        return (
            <div/>
        );
    }

}

function RenderComments({comments, postComment, itemId}) {
    if (comments != null) {
        const commentsItems = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsItems}
                </ul>
                <CommentForm itemId={itemId} postComment={postComment}/>
            </div>
        );
    } else {
        return (
            <div/>
        );
    }
}


const ItemDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.item != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/catalog">Catalog</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.item.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.item.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderItem item={props.item}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} postComment={props.postComment}
                                        itemId={props.item.id}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default ItemDetail;