import pool from "../../../utils/DB";

const enums = async (req, res) => {
  const { enum_type } = req.query;
  try {

  const result = await pool.query("select enum.enumlabel AS key, enum.enumlabel AS value from pg_enum as enum JOIN pg_type AS type ON (type.oid = enum.enumtypid) where typname = $1 GROUP BY enum.enumlabel, type.typname", [enum_type]) 

  // if(error) return res.status(500).json(error)
  return res.status(200).json(result.rows)
  }
  catch(error) {
    if(error) return res.status(500).json(error)
  }
};

export default enums;
