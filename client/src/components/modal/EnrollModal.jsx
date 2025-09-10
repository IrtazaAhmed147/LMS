import { Box, Typography } from "@mui/material";

function EnrollModal({ setModal, handleEnroll, loading }) {
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
        <Typography variant="h6">Enroll Now</Typography>
        <Typography sx={{ my: 2 }}>
          Are you sure you want to Enroll in this Course?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <button
            disabled={loading ? true : false}
            className="common-btn"
            onClick={() => setModal(false)}
          >
            No
          </button>
          <button
            disabled={loading ? true : false}
            className="common-btn"
            onClick={() => handleEnroll()}
          >
            Enroll
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default EnrollModal;
