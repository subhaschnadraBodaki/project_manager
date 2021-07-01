import pool from "../../../utils/DB";

const enums = (req, res) => {
  const { enum_type } = req.query;

  pool.query(
    "select enum.enumlabel AS key, enum.enumlabel AS value from pg_enum as enum JOIN pg_type AS type ON (type.oid = enum.enumtypid) where typname = $1 GROUP BY enum.enumlabel, type.typname", [enum_type], (error, results) => {
        if(error) return res.status(500).json(error)
        res.status(200).json(results.rows)
    }
  );
};

export default enums;
