import {useForm} from 'react-hook-form';

export const Form = () => {

    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (d) => console.log(d);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="demo" ref={register}/>
            <input name="lastname" ref={register({required: true})}/>
            {errors && 'Last name is required.'}
            <input type="submit" value="Submit"/>
        </form>

    )
}