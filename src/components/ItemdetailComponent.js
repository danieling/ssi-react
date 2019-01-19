import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class ItemDetail extends Component {

    renderItem(item) {
        if (item != null) {
            return (
                <Card>
                    <CardImg width="100%" src={item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            );

        } else {
            return (
                <div>
                    No hay item seleccionado
                </div>
            );
        }

    }

    renderComments(comments) {
        if (comments != null) {
            const commentsItems = comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <ul className="list-unstyled">
                            <li>{comment.comment}</li>
                            <li>-- {comment.author} , {comment.date}</li>
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
                </div>
            );
        } else {
            return (
                <div/>
            );
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderItem(this.props.selectedItem)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedItem ? this.props.selectedItem.comments : null)}
                </div>
            </div>
        );
    }

}

export default ItemDetail;