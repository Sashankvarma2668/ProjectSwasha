<?php
require('config.php');
require('mysql.php');
class Core extends Config
{
    function __construct()
    {
        ob_start();
        session_start();
        $this->dbcon = new Mysql();
        date_default_timezone_set('Asia/Kolkata');
        $this->base_url = self::BASE_URL;
        $this->site_title = self::SITE_TITLE;
        $this->site_sub_title = self::SITE_TITLE;
        $this->server_mail = self::SERVER_MAIL;
        $this->current_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $this->datetime = date('Y-m-d H:i:s');
        $this->date = date('Y-m-d');
        $this->time = date('H:i:s');
        $this->year = date('Y');
        $this->month = date('m');
        $this->user_ip = $_SERVER['REMOTE_ADDR'];
        $this->user_agent = $_SERVER['HTTP_USER_AGENT'];
        $this->referer_url = $_SERVER["HTTP_REFERER"] ?? $this->base_url;
        $this->financial_year = $this->financial_year();
        $this->user_session();
        if (self::ENV == "dev") {
            ini_set('display_errors', 1);
            ini_set('display_startup_errors', 1);
            error_reporting(E_ALL);
        } else {
            error_reporting(E_ERROR);
        }
    }
    public static function slugify_underscore($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '_', $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^_\w]+~', '', $text);

        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~_+~', '_', $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return;
        }

        return $text;
    }
    public static function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~-+~', '-', $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return;
        }

        return $text;
    }
    function js_alert($value)
    {
        return "<script>alert($value)</script>";
    }
    function console_log($value)
    {
        return "<script>console.log($value)</script>";
    }
    function set_session($name, $value)
    {
        $_SESSION[$name] = $value;
    }
    function set_cookie($name, $value, $time = '')
    {
        if (!isset($time)) {
            $time = time() + (86400 * 30);
        }
        setcookie($name, $value, $time, "/");
    }
    function get_session($name)
    {
        if (isset($_SESSION[$name])) {
            return $_SESSION[$name];
        }
    }
    function get_cookie($name)
    {
        if (isset($_COOKIE[$name])) {
            return $_COOKIE[$name];
        }
    }
    function delete_session($name)
    {
        unset($_SESSION[$name]);
    }

    function delete_cookie($name)
    {
        setcookie($name, '', time() - 3500, "/");
    }
    function delete_all_sessions()
    {
        session_unset();
        session_destroy();
    }
    function delete_all_cookies()
    {
        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach ($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', time() - 3500);
                setcookie($name, '', time() - 3500, "/");
            }
        }
    }
    function user_session()
    {
        $this->user_login = $this->get_cookie('user_login') ?? $this->get_session('user_login');
        $this->student_login = $this->get_cookie('student_login') ?? $this->get_session('student_login');
        $this->user_id = $this->get_cookie('user_id') ?? $this->get_session('user_id');
        if ($this->user_login == 1 && isset($this->user_id)) {
            $check_login_query = $this->dbcon->count("users", "id", "id='$this->user_id' AND (user_type='donor' OR user_type='admin' OR user_type='employee') AND status='active'");
            if ($check_login_query > 0) {
                $this->user_data = $this->dbcon->get("users", "*", "id='$this->user_id' AND (user_type='donor' OR user_type='admin' OR user_type='employee') AND status='active'");
                $this->user_login = 1;
                $this->user_permissions = explode(',', $this->dbcon->get('roles', 'permissions', "id=" . $this->user_data['role_id'])['permissions']);
                if ($this->user_data['user_type'] == 'admin') {
                    if (!empty($this->get_cookie('header_selected_center'))) {
                        $this->center_id = $this->get_cookie('header_selected_center');
                    } else {
                        $this->center_id = $this->dbcon->get('centers', 'id')['id'];
                    }
                } else if ($this->user_data['user_type'] === 'donor') {
                    $this->donor_id = $this->dbcon->get('donors', 'id', "user_id=" . $this->user_data['id'])['id'];
                    $this->center_id = $this->dbcon->get('centers', 'id', "donor=$this->donor_id")['id'];
                } else if ($this->user_data['user_type'] === 'employee') {
                    $this->center_id = $this->dbcon->get('employees', 'center', "user_id=" . $this->user_data['id'])['center'];
                } else if ($this->user_data['user_type'] === 'student') {
                    $this->center_id = $this->dbcon->get('students', 'center', "user_id=" . $this->user_data['id'])['center'];
                }
                $this->started_year = $this->dbcon->get('centers', 'inception_year', "id='$this->center_id'")['inception_year'];
            } else {
                $this->user_login = 0;
            }
        } else {
            $this->user_login = 0;
        }
        if ($this->student_login == 1 && isset($this->user_id)) {
            $check_login_query = $this->dbcon->count("users", "id", "id='$this->user_id' AND (user_type='student') AND status='active'");
            if ($check_login_query > 0) {
                $this->user_data = $this->dbcon->get("users", "*", "id='$this->user_id' AND (user_type='student') AND status='active'");
                $this->student_login = 1;
                $this->center_id = $this->dbcon->get('students', 'center', "user_id=" . $this->user_data['id'])['center'];
                $this->started_year = $this->dbcon->get('centers', 'inception_year', "id='$this->center_id'")['inception_year'];
            } else {
                $this->student_login = 0;
            }
        } else {
            $this->student_login = 0;
        }
    }

    // check cors function ---------------------------------
    function check_cors($cors_domains = self::CORS_DOMAINS)
    {
        $referer = $_SERVER['HTTP_REFERER'];
        $domain = parse_url($referer);
        if (!in_array($domain['host'], $cors_domains)) {
            echo 'unauthorised domain request';
            return exit;
        }
    }

    // get option function ---------------------------------
    function get_option($name, $field)
    {
        $result = $this->dbcon->get('options', $field, "reference='$name' AND status='active' AND deleted='no'");
        if ($result) {
            return $result[$field];
        } else {
            return;
        }
    }

    function upload_file($name, $directory, $extentions)
    {
        $target_file = $directory . basename($name["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $new_file = $directory . time() . rand(10, 99) . "." . $imageFileType;
        $new_file_path = str_replace("../", "", $new_file);
        if (!file_exists($new_file)) {
            if (in_array($imageFileType, $extentions)) {
                if (move_uploaded_file($name["tmp_name"], $new_file)) {
                    return array('status' => 'success', 'path' => $new_file_path);
                } else {
                    return array('status' => 'Sorry, there was an error uploading your file.');
                }
            } else {
                return array('status' => 'Sorry, file extention not allowed.');
            }
        } else {
            return array('status' => 'Sorry, file already exists.');
        }
    }

    function user_session_id()
    {
        $user_session_id = $this->get_cookie('user_session_id') ?? $this->get_session('user_session_id');
        if (empty($user_session_id) or $user_session_id == '') {
            $user_session_id = time() . rand(10, 99);
            $this->set_cookie('user_session_id', $user_session_id);
            $this->set_session('user_session_id', $user_session_id);
        }
        return $user_session_id;
    }
    function flash_message($name)
    {
        if (!empty($name)) {
            if (!empty($this->get_cookie($name))) {
                $response = $this->get_cookie($name);
                $this->delete_cookie($name);
                return $response;
            } else {
                return 'session empty';
            }
        } else {
            return 'name empty';
        }
    }
    function financial_years($start_year)
    {
        if ($this->month > 3) {
            $this_year = $this->year + 1;
        } else {
            $this_year = $this->year;
        }
        $financial_years = array();
        for ($this_year; $this_year > $start_year; $this_year--) {
            $financial_years[] = ($this_year - 1) . '-' . $this_year;
        }
        return $financial_years;
    }
    function financial_year()
    {
        if ($this->month > 3) {
            $financial_year = date("Y") . '-' . date("Y", strtotime("+1 years"));
        } else {
            $financial_year = date("Y", strtotime("-1 years")) . '-' . date("Y");
        }
        return $financial_year;
    }
}
