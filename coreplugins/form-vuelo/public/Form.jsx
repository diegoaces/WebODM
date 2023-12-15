import PropTypes from 'prop-types';
import React, {Component} from "react";
import Input from "./components/Input";
import SelectInput from "./components/SelectInput";
import {Modal} from "react-bootstrap";
import predios from "./data/predios.json";
import estados from "./data/estados.json";
import objetivos from "./data/objetivos.json";

class FormDemo extends Component {

    static propTypes = {
        taskId: PropTypes.string.isRequired,
        apiURL: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            inputFields: {
                fecha_vuelo: "",
                email: "",
                number: "",
                predio: null,
                estado: null,
                objetivo: null,
            },
            errors: {},
            isSubmitting: false,
            isDialogOpen: false,
        };
    }

    validateValues = (inputValues) => {
        let errors = {};
        for (let key in inputValues) {
            if (inputValues.hasOwnProperty(key)) {
                if (!inputValues[key]) {
                    errors[key] = `Este campo es obligatorio.`;
                }
            }
        }
        return errors;
    };

    handleObjetivosChange = (selectedOption) => {
        this.setState({
            inputFields: {
                ...this.state.inputFields,
                objetivo: selectedOption,
            },
        });
    }
    handleEstadoChange = (selectedOption) => {
        this.setState({
            inputFields: {
                ...this.state.inputFields,
                estado: selectedOption,
            },
        });
    }
    handleSelectChange = (e) => {
        this.setState({
            inputFields: {
                ...this.state.inputFields,
                predio: e,
            },
        });
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            inputFields: {
                ...this.state.inputFields,
                [name]: value,
            },
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {inputFields} = this.state;
        const errors = this.validateValues(inputFields);

        if (Object.keys(errors).length > 0) {
            this.setState({errors});
        } else {
            this.performHttpPost(inputFields);
        }
    };

    performHttpGet = () => {
        $.ajax({
            url: `${this.props.apiURL}/task/${this.props.taskId}/`,
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET'
        }).done((response) => {
            const data = response.form;
            this.setState({
                inputFields: {
                    fecha_vuelo: data.fecha_vuelo,
                    email: data.email,
                    number: data.number,
                    predio: data.predio,
                    estado: data.estado,
                    objetivo: data.objetivo,
                },
                errors: {},
                isSubmitting: false
            });
        }).fail((e) => {
            //this.onErrorInDialog("Cannot get form.");
        });
    }
    performHttpPost = inputFields => {
        this.setState({isSubmitting: true});
        $.ajax({
            url: `${this.props.apiURL}/task/${this.props.taskId}/`,
            contentType: 'application/json',
            data: JSON.stringify(inputFields),
            dataType: 'json',
            type: 'POST'
        }).done(() => {
            this.finishSubmit();

        }).fail((e) => {
            this.onErrorInDialog("Cannot create new form.");
        });

    }
    onErrorInDialog = msg => {
        this.setState({error: msg});
    };
    finishSubmit = () => {
        //delay to show success message
        setTimeout(() => {
            this.setState({
                isSubmitting: false,
                isDialogOpen: false,
                inputFields: {
                    fecha_vuelo: "",
                    email: "",
                    number: "",
                    predio: null,
                    estado: null,
                    objetivo: null
                },
                errors: {},
                error: null,
            });
        }, 1500);


    };
    handleShow = () => {
        this.setState({
            isDialogOpen: true
        });
        this.performHttpGet();

    }
    onHide = () => {
        this.setState({
            isDialogOpen: false,
            inputFields: {
                fecha_vuelo: "",
                email: "",
                number: "",
                predio: null,
                estado: null,
                objetivo: null,
            },
            errors: {},
        });

    }

    render() {
        const {errors, isDialogOpen, error, isSubmitting} = this.state;

        return (<div>
                <div className="inline-block  ">
                    <button className="btn btn-sm btn-success" onClick={this.handleShow}>
                        <i className="fa fa-plane" aria-hidden="true"> </i>
                        Formulario vuelo
                    </button>
                </div>

                <Modal onHide={this.onHide} show={isDialogOpen} className={"new-task"}>
                    <Modal.Header closeButton onHide={this.onHide}>
                        <Modal.Title> Formulario de vuelo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <div className="error-msg">{error}</div>}
                        {isSubmitting && <div className="loading-msg">Guardando datos...</div>}

                        {Object.keys(errors).length === 0 && this.isSubmitting ? (
                            <span className="success-msg">Formulario ingresado</span>
                        ) : (<span className="error-msg"></span>)
                        }
                        <div>
                            <div className="new-task-panel theme-background-highlight">
                                <div className="form-horizontal">
                                    <form onSubmit={this.handleSubmit}>
                                        <SelectInput name="predio" label="Predio" onChange={this.handleSelectChange}
                                                     options={predios}
                                                     error={errors.predio} searchable={true} clearable={true}
                                                     value={this.state.inputFields.predio}/>

                                        <Input name="fecha_vuelo" label="Fecha de vuelo" type="date"
                                               onChange={this.handleInputChange}
                                               error={errors.fecha_vuelo}
                                               value={this.state.inputFields.fecha_vuelo}/>

                                        <SelectInput
                                            name="estado" label="Objetivo" onChange={this.handleObjetivosChange}
                                            options={objetivos}
                                            value={this.state.inputFields.objetivo}
                                            error={errors.objetivo} searchable={false} clearable={true}/>

                                        <Input name="email" label="Email" onChange={this.handleInputChange}
                                               error={errors.email} type="email"
                                               value={this.state.inputFields.email}/>

                                        <Input name="number" label="Número" onChange={this.handleInputChange}
                                               type="number"
                                               error={errors.number}
                                               value={this.state.inputFields.number}/>

                                        <SelectInput name="estado" label="Estado" onChange={this.handleEstadoChange}
                                                     options={estados}
                                                     value={this.state.inputFields.estado}
                                                     error={errors.estado} searchable={false} clearable={true}/>
                                        <button type="submit">Guardar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
            ;

    }

}

export default FormDemo;