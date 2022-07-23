
import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';

export default function FormDialog(props) {
 
    const [editValues, setEditValues] = React.useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category
    })

    const handleEidtGame = () => {
        Axios.put("http://localhost:3001/edit",{
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category
        }).then((response) => {
         console.log(response);
        })
        handleClose();
    }
   

    const handleDeleteGame = () => {
      Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
      alert("Excluído com sucesso")
      handleClose();
    }

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeValues = value => {
    setEditValues(prevValues => ({
        ...prevValues,
        [value.target.id]: value.target.value
    }))
  }

  return (   

      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do jogo"
            defaultValue={props.name}
            onChange={handleChangeValues}
            type="text"
            fullWidth         
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="Preço"
            defaultValue={props.cost}
            onChange={handleChangeValues}
            type="text"
            fullWidth         
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Categoria"
            defaultValue={props.category}
            onChange={handleChangeValues}
            type="text"
            fullWidth         
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteGame}>Excluir</Button>
          <Button onClick={handleEidtGame}>Salvar</Button>
        </DialogActions>
      </Dialog>
    
  );
}
