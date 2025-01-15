<?php
$email = $_POST['email']; // اسم المستخدم
$password = $_POST['password']; // كلمة المرور
// إنشاء الاتصال
$conn = new  mysqli('localhost', 'root', '', 'letsplay');
// التحقق من الاتصال
if ($conn->connect_error) {
    die("failed... " . $conn->connect_error);
}else{
    $stmt = $conn->prepare("INSERT INTO `login` (`email`,`password`) VALUES (`email`,`password`)" );
$stmt-> bind_param("ss",$email,$password);
$execval = $stmt->execute();
		echo $execval;
echo "successfully...";

$stmt->close();
$conn->close();

}
?>