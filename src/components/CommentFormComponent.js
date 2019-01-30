import React, {Component} from 'react';
import {Button, Col, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {Control, Errors, LocalForm} from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.itemId, values.rating, values.author, values.message);
    }

    render() {
        return (
            <div>
                <Button outline type="submit" color="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"/>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" xs={12}>Rating</Label>
                                <Col xs={{size: 12}}>
                                    <Control.select model=".contactType" name="contactType"
                                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" xs={12}>Your Name</Label>
                                <Col xs={12}>
                                    <Control.text model=".author" id="author" name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      required,
                                                      minLength: minLength(3),
                                                      maxLength: maxLength(15)
                                                  }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" xs={12}>Your Feedback</Label>
                                <Col xs={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                                      rows="6"
                                                      className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col xs={{size: 10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;