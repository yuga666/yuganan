<?php
class server 
{
	private $data = null;
	private $rc = 500;		
	
	
	public function __construct()
	{
        $this->data = array();
	}

	
	public function __destruct()
	{
	}
	
	
	public function handleRequest()
	{
		sleep(2); // artificial delay, remove in production
		
		if($_SERVER['REQUEST_METHOD'] === 'POST')
		{
			$this->postComment();
		}
		else
		{
			$this->rc = 400; 
            $this->data["error"] = "Bad request: method not supported";            
		}
	
		http_response_code($this->rc);
        
		if($this->rc != 201)
		{
			header('content-type: application/json');
			echo json_encode($this->data, JSON_PRETTY_PRINT);
		}			
	}
	
	
	private function postComment()
	{
		if(isset($_POST["email"]) && isset($_POST["subject"]) && isset($_POST["message"]))
		{
			$email = $_POST["email"];
			$subject = $_POST["subject"];
			$message = $_POST["message"];
			
			if(empty($email) || empty($subject) || empty($message)) 
			{
				$this->rc = 400; 
                $this->data["error"] = "Bad Request: one or more parameters are empty";

			}
			else
			{
                // write to database or send email to admin...
                
				$this->rc = 201; // OK - Created
			}
		}
		else
		{
			$this->rc = 400; // Bad Request: parameters missing
            $this->data["error"] = "Bad Request: one or more parameters are missing";
		}
	}
}
$server = new server();
$server->handleRequest();
?>
