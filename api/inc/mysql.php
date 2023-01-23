<?php
require_once('config.php');
class Mysql extends Config
{

    function __construct()
    {
        $this->dbcon = new mysqli(self::DB_HOST, self::DB_USER, self::DB_PASS, self::DB_NAME);
        if ($this->dbcon->connect_error) {
            echo "Connection failed: " . $this->dbcon->connect_error;
            exit;
        }
    }
    function sql($query)
    {
        return $this->dbcon->query($query);
    }
    function real_escape_string($string)
    {
        return $this->dbcon->real_escape_string($string);
    }
    function add($table, $data)
    {
        $fields = "`" . implode("`,`", array_keys($data)) . "`";
        $values = "'" . implode("','", array_values($data)) . "'";
        $sql_query = "INSERT INTO `$table` ($fields) VALUES ($values)";
        // echo $sql_query;
        if ($this->dbcon->query($sql_query) === TRUE) {
            return $this->dbcon->insert_id;
        } else {
            return "Error:" . $this->dbcon->error;
        }
    }

    function update($table, $array, $condition = "")
    {
        $sql_query = "UPDATE `$table` SET ";
        foreach ($array as $key => $value) {
            if ($key === array_key_last($array)) {
                $sql_query .= " `$key` = '$value'";
            } else {
                $sql_query .= " `$key` = '$value',";
            }
        }
        // echo $sql_query;
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        return $this->dbcon->query($sql_query);
    }

    function delete($table, $condition)
    {
        $sql_query = "DELETE FROM `$table`";
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        return $this->dbcon->query($sql_query);
    }
    function count($table, $fields, $condition = "")
    {
        $sql_query = "SELECT $fields FROM $table";
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        $result = $this->dbcon->query($sql_query);
        if ($result == TRUE) {
            return $result->num_rows;
        } else {
            return 0;
        }
    }
    function join_count($table, $as, $fields, $join_array = array(), $condition =  "",  $order = "", $limit = "", $group_by = "")
    {

        $sql_query = "SELECT $fields FROM `$table` $as";
        if (!empty($join_array)) {
            foreach ($join_array as $join) {
                foreach ($join as $key => $value) {
                    if ($key == 'on') {
                        $sql_query .= " ON $value";
                    } else {
                        $sql_query .= " $value";
                    }
                }
            }
        }
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        if (!empty($order)) {
            $sql_query .= " ORDER BY $order";
        }
        if (!empty($limit)) {
            $sql_query .= " LIMIT $limit";
        }
        if (!empty($group_by)) {
            $sql_query .= " GROUP BY $group_by";
        }
        // echo $sql_query;
        $result = $this->dbcon->query($sql_query);
        if ($result == TRUE) {
            return $result->num_rows;
        } else {
            return 0;
        }
    }
    function join($table, $as, $fields, $join_array = array(), $condition =  "")
    {

        $sql_query = "SELECT $fields FROM `$table` $as";
        if (!empty($join_array)) {
            foreach ($join_array as $join) {
                foreach ($join as $key => $value) {
                    if ($key == 'on') {
                        $sql_query .= " ON $value";
                    } else {
                        $sql_query .= " $value";
                    }
                }
            }
        }
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        if (!empty($order)) {
            $sql_query .= " ORDER BY $order";
        }
        if (!empty($limit)) {
            $sql_query .= " LIMIT $limit";
        }
        if (!empty($group_by)) {
            $sql_query .= " GROUP BY $group_by";
        }

        $result = $this->dbcon->query($sql_query);
        if ($result == TRUE) {
            if ($result->num_rows == 1) {
                return $result->fetch_assoc();
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    function join_all($table, $as, $fields, $join_array = array(), $condition =  "",  $order = "", $limit = "", $group_by = "")
    {

        $sql_query = "SELECT $fields FROM `$table` $as";
        if (!empty($join_array)) {
            foreach ($join_array as $join) {
                foreach ($join as $key => $value) {
                    if ($key == 'on') {
                        $sql_query .= " ON $value";
                    } else {
                        $sql_query .= " $value";
                    }
                }
            }
        }
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        if (!empty($order)) {
            $sql_query .= " ORDER BY $order";
        }
        if (!empty($limit)) {
            $sql_query .= " LIMIT $limit";
        }
        if (!empty($group_by)) {
            $sql_query .= " GROUP BY $group_by";
        }
        // echo $sql_query;
        $result = $this->dbcon->query($sql_query);
        if ($result == TRUE) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                return $data;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    function get($table, $fields, $condition =  "")
    {
        $sql_query = "SELECT $fields FROM `$table`";
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        $result = $this->dbcon->query($sql_query);
        return $result->fetch_assoc();
    }

    function get_all($table, $fields, $condition =  "", $order = "", $limit = "", $group_by = "")
    {
        $sql_query = "SELECT $fields FROM `$table`";
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        if (!empty($order)) {
            $sql_query .= " ORDER BY $order";
        }
        if (!empty($limit)) {
            $sql_query .= " LIMIT $limit";
        }
        if (!empty($group_by)) {
            $sql_query .= " GROUP BY $group_by";
        }

        $result = $this->dbcon->query($sql_query);
        if ($result == TRUE) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                return $data;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    function get_last_id($table)
    {
        $sql_query = "SELECT id FROM $table ORDER BY id DESC LIMIT 1";
        $result = $this->dbcon->query($sql_query)->fetch_row();
        return $result[0];
    }
}
