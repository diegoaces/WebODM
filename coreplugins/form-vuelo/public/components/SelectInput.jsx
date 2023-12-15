import Select from "react-select";
import PropTypes from 'prop-types';
import React, {Component} from "react";

class SelectInput extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        options: PropTypes.array.isRequired,
        placeholder: PropTypes.string,
        searchable: PropTypes.bool,
        clearable: PropTypes.bool,
        error: PropTypes.string,
    }

    render() {
        const {name, label, onChange, value, options, placeholder, searchable, clearable, error} = this.props;
        return (
            <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor={name}>{label}</label>
                <div className="col-sm-10">
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={clearable}
                        isSearchable={searchable}
                        value={value}
                        onChange={onChange}
                        options={options}
                        placeholder={placeholder}
                        name={name}
                        id={name}
                    />
                    {error && <div className="alert-danger">{error}</div>}
                </div>
            </div>
        );
    }
}

export default SelectInput;