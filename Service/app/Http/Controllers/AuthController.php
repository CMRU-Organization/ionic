<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    public function login()
    {
        //set login mysql
        $credentials = [
            'studentcode' => request('studentcode'),
            'password' => request('password')
        ];

/*        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('RestApi')->accessToken;
            return $this->sendResponse($token);
        }else {*/

            //checking login oracle
            $username = env('ORACLE_DB_USERNAME');
            $password = env('ORACLE_DB_PASSWORD');
            $ORACLE_DB_SCHEMA_PREFIX = env('ORACLE_DB_SCHEMA_PREFIX');
            $db = env('ORACLE_DB_CON');
            if ($c = OCILogon($username, $password, $db, 'utf8')) {
                //echo "Successfully connected to Oracle.\n";
                $query = "select * from " . $ORACLE_DB_SCHEMA_PREFIX . ".MOBILE_STUDENTLOGIN  WHERE STUDENTCODE='" . request('studentcode') . "' AND PASSWORD ='" . request('password') . "'";
                $s = oci_parse($c, $query);
                if (!$s) {
                    $m = oci_error($c);
                    trigger_error('Could not parse statement: ' . $m['message'], E_USER_ERROR);
                    return $this->sendError('Could not parse statement: ' . $m['message'], [], 400);
                }
                $r = oci_execute($s);
                if (!$r) {
                    $m = oci_error($s);
                    trigger_error('Could not execute statement: ' . $m['message'], E_USER_ERROR);
                    return $this->sendError('Could not execute statement: ' . $m['message'], [], 400);
                }

                if (($row = oci_fetch_object($s)) != false) {
                    if (Auth::attempt($credentials)) {
                        $user = Auth::user();
                        $token = $user->createToken('RestApi')->accessToken;
                        return $this->sendResponse($token);
                    }else {
                        // Use upper case attribute names for each standard Oracle column
                        $input['userid'] = $row->USERID;
                        $input['studentcode'] = $row->STUDENTCODE;
                        $input['prefixname'] = $row->PREFIXNAME;
                        $input['studentname'] = $row->STUDENTNAME;
                        $input['studentsurname'] = $row->STUDENTSURNAME;
                        $input['password'] = bcrypt($row->PASSWORD);
                        $user = User::create($input);
                        $token = $user->createToken('RestApi')->accessToken;
                        return $this->sendResponse($token);
                    }

                } else {
                    return $this->sendError('Username or password wrong !!.', [], 400);
                }

                OCILogoff($c);

            } else {
                $err = OCIError();
                echo "Connection failed." . $err[text];
                return $this->sendError("Connection oracle failed." . $err[text], [], 400);
            }

            return $this->sendError('Username or password wrong !.', [], 400);
       // }
    }

    /*    public function register(Request $request)
        {
            $input = $request->all();

            $validator = Validator::make($input, [
                'studentname' => 'required',
                'studentcode' => 'required|unique:users',
                'password' => 'required',
                'c_password' => 'required|same:password',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation error.', $validator->errors(), 400);
            }

            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $token = $user->createToken('RestApi')->accessToken;
            return $this->sendResponse($token);
        }*/

    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->authAcessToken()->delete();
            return $this->sendResponse(null, 'User logged out.');
        }
        return $this->sendError('Unauthorized.', [], 401);
    }

    public function profile()
    {
        $userId = Auth::user()->id;
        $user = User::with('roles')->where('id', $userId)->firstOrFail();

        $object = (object)[
            'STUDENTCODE' => $user->studentcode,
            'PREFIXNAME' =>  $user->prefixname,
            'STUDENTNAME' =>  $user->studentname,
            'STUDENTSURNAME' =>  $user->studentsurname,
        ];

        return $this->sendResponse($object);
    }

    public function checkprofile_none_authen()
    {
        $studentcode = request('studentcode');

        //checking all profile oracle
        $username = env('ORACLE_DB_USERNAME');
        $password = env('ORACLE_DB_PASSWORD');
        $db = env('ORACLE_DB_CON');
        $ORACLE_DB_SCHEMA_PREFIX = env('ORACLE_DB_SCHEMA_PREFIX');
        if ($c = OCILogon($username, $password, $db, 'utf8')) {
            //echo "Successfully connected to Oracle.\n";
            $query = "select * from ".$ORACLE_DB_SCHEMA_PREFIX.".MOBILE_STUDENTALLINFO  WHERE STUDENTCODE='".$studentcode."'";
            //echo $query;
            $s = oci_parse($c, $query);
            if (!$s) {
                $m = oci_error($c);
                trigger_error('Could not parse statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not parse statement: ' . $m['message'], [], 400);
            }
            $r = oci_execute($s);
            if (!$r) {
                $m = oci_error($s);
                trigger_error('Could not execute statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not execute statement: ' . $m['message'], [], 400);
            }

            if (($row = oci_fetch_object($s)) != false) {
                return $this->sendResponse($row);

            } else {
                return $this->sendError('Not found user profile !!.', [], 400);
            }

            OCILogoff($c);

        } else {
            $err = OCIError();
            echo "Connection failed." . $err[text];
            return $this->sendError("Connection oracle failed." . $err[text], [], 400);
        }

        return $this->sendError('Not found user profile !.', [], 400);
    }

    public function checkprofile()
    {
        //check user mysql
        $userId = Auth::user()->id;
        $user = User::with('roles')->where('id', $userId)->firstOrFail();

        //checking all profile oracle
        $username = env('ORACLE_DB_USERNAME');
        $password = env('ORACLE_DB_PASSWORD');
        $db = env('ORACLE_DB_CON');
        $ORACLE_DB_SCHEMA_PREFIX = env('ORACLE_DB_SCHEMA_PREFIX');
        if ($c = OCILogon($username, $password, $db, 'utf8')) {
            //echo "Successfully connected to Oracle.\n";
            $query = "select * from ".$ORACLE_DB_SCHEMA_PREFIX.".MOBILE_STUDENTALLINFO  WHERE STUDENTCODE='" . $user->studentcode . "'";
            //echo $query;
            $s = oci_parse($c, $query);
            if (!$s) {
                $m = oci_error($c);
                trigger_error('Could not parse statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not parse statement: ' . $m['message'], [], 400);
            }
            $r = oci_execute($s);
            if (!$r) {
                $m = oci_error($s);
                trigger_error('Could not execute statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not execute statement: ' . $m['message'], [], 400);
            }

            if (($row = oci_fetch_object($s)) != false) {
                return $this->sendResponse($row);

            } else {
                return $this->sendError('Not found user profile !!.', [], 400);
            }

            OCILogoff($c);

        } else {
            $err = OCIError();
            echo "Connection failed." . $err[text];
            return $this->sendError("Connection oracle failed." . $err[text], [], 400);
        }

        return $this->sendError('Not found user profile !.', [], 400);
    }

    public function mygrade()
    {
        //check user mysql
        $userId = Auth::user()->id;
        $user = User::with('roles')->where('id', $userId)->firstOrFail();

        //checking all profile oracle
        $username = env('ORACLE_DB_USERNAME');
        $password = env('ORACLE_DB_PASSWORD');
        $db = env('ORACLE_DB_CON');
        $ORACLE_DB_SCHEMA_PREFIX = env('ORACLE_DB_SCHEMA_PREFIX');
        if ($c = OCILogon($username, $password, $db, 'utf8')) {
            //echo "Successfully connected to Oracle.\n";
            $query = "select * from ".$ORACLE_DB_SCHEMA_PREFIX.".MOBILE_STUDENTGRADES  WHERE STUDENTCODE='" . $user->studentcode . "' order by ACADYEAR,SEMESTER,COURSECODE";
            $s = oci_parse($c, $query);
            if (!$s) {
                $m = oci_error($c);
                trigger_error('Could not parse statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not parse statement: ' . $m['message'], [], 400);
            }
            $r = oci_execute($s);
            if (!$r) {
                $m = oci_error($s);
                trigger_error('Could not execute statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not execute statement: ' . $m['message'], [], 400);
            }
            $responseArray = [];
            while(($row = oci_fetch_object($s)) != false) {
                /*                array_push($responseArray, (object)[
                                        'STUDENTCODE' => $row->STUDENTCODE,
                                        'STUDENTID' =>  $row->STUDENTID,
                                        'ACADYEAR' =>  $row->ACADYEAR,
                                        'SEMESTER' =>  $row->SEMESTER,
                                        'COURSEID' =>  $row->COURSEID,
                                        'COURSECODE' =>  $row->COURSECODE,
                                        'COURSENAME' =>  $row->COURSENAME,
                                        'SECTION' =>  $row->SECTION,
                                        'GRADE' =>  $row->GRADE,
                                        'GPA' =>  $row->GPA,
                                        'GPAX' =>  $row->GPAX
                                    ]);*/
                $responseArray[] = $row;
            }
            return $this->sendResponse($responseArray);

            OCILogoff($c);

        } else {
            $err = OCIError();
            echo "Connection failed." . $err[text];
            return $this->sendError("Connection oracle failed." . $err[text], [], 400);
        }

        return $this->sendError('Not found user grade !.', [], 400);
    }

    public function classSchedule()
    {
        //check user mysql
        $userId = Auth::user()->id;
        $user = User::with('roles')->where('id', $userId)->firstOrFail();

        //checking all profile oracle
        $username = env('ORACLE_DB_USERNAME');
        $password = env('ORACLE_DB_PASSWORD');
        $db = env('ORACLE_DB_CON');
        $ORACLE_DB_SCHEMA_PREFIX = env('ORACLE_DB_SCHEMA_PREFIX');
        if ($c = OCILogon($username, $password, $db, 'utf8')) {
            //echo "Successfully connected to Oracle.\n";
            $query = "select * from ".$ORACLE_DB_SCHEMA_PREFIX.".mobile_studentenroll  WHERE STUDENTCODE='" . $user->studentcode . "' ";
            $s = oci_parse($c, $query);
            if (!$s) {
                $m = oci_error($c);
                trigger_error('Could not parse statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not parse statement: ' . $m['message'], [], 400);
            }
            $r = oci_execute($s);
            if (!$r) {
                $m = oci_error($s);
                trigger_error('Could not execute statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not execute statement: ' . $m['message'], [], 400);
            }
            $responseArray = [];
            while(($row = oci_fetch_object($s)) != false) {
                $responseArray[] = $row;
            }
            return $this->sendResponse($responseArray);

            OCILogoff($c);

        } else {
            $err = OCIError();
            echo "Connection failed." . $err[text];
            return $this->sendError("Connection oracle failed." . $err[text], [], 400);
        }

        return $this->sendError('Not found Class Schedule !.', [], 400);
    }

    public function examSchedule()
    {
        //check user mysql
        $userId = Auth::user()->id;
        $user = User::with('roles')->where('id', $userId)->firstOrFail();

        //checking all profile oracle
        $username = env('ORACLE_DB_USERNAME');
        $password = env('ORACLE_DB_PASSWORD');
        $db = env('ORACLE_DB_CON');
        $ORACLE_DB_SCHEMA_PREFIX = env('ORACLE_DB_SCHEMA_PREFIX');
        if ($c = OCILogon($username, $password, $db, 'utf8')) {
            //echo "Successfully connected to Oracle.\n";
            $query = "select * from ".$ORACLE_DB_SCHEMA_PREFIX.".mobile_studentexam  WHERE STUDENTCODE='" . $user->studentcode . "' ";
            $s = oci_parse($c, $query);
            if (!$s) {
                $m = oci_error($c);
                trigger_error('Could not parse statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not parse statement: ' . $m['message'], [], 400);
            }
            $r = oci_execute($s);
            if (!$r) {
                $m = oci_error($s);
                trigger_error('Could not execute statement: ' . $m['message'], E_USER_ERROR);
                return $this->sendError('Could not execute statement: ' . $m['message'], [], 400);
            }
            $responseArray = [];
            while(($row = oci_fetch_object($s)) != false) {
                $responseArray[] = $row;
            }
            return $this->sendResponse($responseArray);

            OCILogoff($c);

        } else {
            $err = OCIError();
            echo "Connection failed." . $err[text];
            return $this->sendError("Connection oracle failed." . $err[text], [], 400);
        }

        return $this->sendError('Not found Exam Schedule !.', [], 400);
    }

}
