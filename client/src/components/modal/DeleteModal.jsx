import { Box, Typography } from "@mui/material";

function DeleteModal({ type, setModal, id, handleDelete }) {

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: '1212'
      }}
    >
      <Box sx={{ background: "#fff", p: 3, borderRadius: 2, width: "400px" }}>
        <Typography variant="h6">Delete {type}?</Typography>
        <Typography sx={{ my: 2 }}>
          Are you sure you want to delete this {type}?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <button
            className="common-btn"
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button
            className="common-btn"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default DeleteModal;
