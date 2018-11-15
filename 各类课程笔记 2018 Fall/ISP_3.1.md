Assignment_3.1

1.Identify the problem associated around the IoT device/technology/security principle.

With IoT gaining more prevalence, we're seeing internet connected devices replacing traditional, more "analog" devices as their "smart" variants. Locks are no exception. A series of locks have been released into the market that promise to replace your key operated versions - instead, all they need is an app on your phone. However, poor implementation has led to glaring vulnerabilities, which leaves owners of these locks unsecure. The locks utilize Bluetooth Low Energy (BLE) to communicate with the app on your phone. Researchers who cracked some of these smart-locks say that BLE itself is not to blame, but the poor implementation of it is.


2.Write up (PDF file) containing the following:
3-4 sentences describing the functioning of the device/technology.
Smart locks are devices that perform locking and unlocking operations based on commands they receive from trusted devices such as a smartphone. They typically operate using Bluetooth Low Energy (BLE) for communication with the trusted devices. Usually, the user triggers the sending of a cryptographic key to the lock when in range to unlock their home.
2-3 sentences describing how it is vulnerable or not following the security principles
Plain text passwords
	Passwords must not be stored in plain text. Instead, they must be hashed and salted and the                             smart lock must have no record of the actual password itself. Any incoming attempts must be    hashed and salted using the same algorithms and verified with the stored value.
How does it break Confidentiality. Integrity and Availability?
Not decrypting entered passwords - encrypted string which can be easily sniffed itself is enough to get through the system
As any communication between the smart lock and the phone happen over the common airwaves, the data being transmitted must be secured. This is where correct implementation of encryption plays a major role. In some instances, the password used to unlock the smart lock was encrypted and then sent over the airwaves. This encrypted string was sniffed out by attackers. It then turned out that the lock wasn’t actually validating the password itself - the encrypted string was enough to gain entry. Fundamentally speaking, the password was there for the taking the entire time.
Man in the Middle attacks - spoofing?: From the article[1] we could see a image that the attacker has got the packets of the transmission between the smartphone and the lock. If the attacker and the user are in the same LAN, it is easy for attacker to get the packets using some packet tracking softwares like wireshark or fiddler.
3-4 sentences describing the properties of the solution (computational overhead, memory, tamper resilience, etc.)
Multi-factor authentication - Overhead: server to generate codes instantly. Or use existing 2FA service such as Duo? Ease of use - people must be willing to adopt two factor authentication.
Not hard-coded passwords - Passwords must be user changeable and must also not be stored in plain text. This way, we can ensure that factory default passwords don’t open all locks.
Proper encryption - implement encryption correctly - don’t transmit passwords in plain text.
Don’t store passwords in plain text - use salted hashes.
Don’t use custom encryption algorithms - use validated protocols.
Monitoring service in the lock that logs all attempts to unlock. Since smart locks are typically connected to the network of the house too, these logs can be used to trigger alerts that an attempt is in progress.
List out 4-5 applications how it can be used and how will it overcome any associated problems.
	
	ASK PROF ABOUT APPLICATIONS - every door basically?
Two factor authentication or multi-factor authentication can be implemented in many different systems. They’re quickly becoming popular amongst web services to prevent attackers from gaining access to user accounts. These operate based on the principle of the authorized user having something, and knowing something, where the two are obtained from separate sources. 
Facial Recognition: The lock will have a camera that sees who is trying to access the lock. The app will use facial recognition to detect verified users and grant them access in addition to normal authentication, doing this will prevent anyone from simply hacking a password to access a lock.
Physical Tampering Detection: Application that detects any obscure movements or damage done to the physical lock, which would sound an alarm or notify users of break in. This would prevent anyone physically breaking or tampering the lock.
Bluetooth Range Monitoring: Application prevents device from using bluetooth outside of smart lock range. This would prevent man in the middle attacks.
Paired Device Monitor System: Application would monitor which devices are paired to the lock system. Devices would be kept track of so that devices with and without privilege are noted.
Write a threat model for the system, explaining what security properties the system has and in what circumstances it is supposed to resist attack.  Write up all threats for the system
Threat
Risk
Solution
Attacker could use some packet analysers like wireshark and fiddler, which is easy for them to capture the packets during the transmission. As we know, some manufacturers just put the plaintext password in the BLE link layer.
It is easy to unlock with the plaintext password.
Implement encryption in a proper way.

Pros:Protect the plaintext password from sniffer.
Attacker could get the password by decompiling APKs.
Attacker could see the hard-coded password in the source code.
Do not use hard-coded password, store password in other ways.
Pros: Abandon the unreasonable way to store password.
Attacker is also able to hijack the “encrypted” by changing one byte in its unique key. The lock will get confused and opens.
Unlock the lock by changing the lock into an error state. The lock might be unavailable due to the error state.
The lock could not open in error state. That might be configured by manufacturers. 
Attacker could unlock with encrypted-password if the unlock process is just to check whether encrypted-password is matched or not.
Attacker could unlock even they don’t know the plaintext.
Apply MFA.
Pros: Attacker could not unlock without breaking another authentication process.
Cons: Make the authentication process more complex. And we could not make sure whether the applications for MFA work well all the time.
       	
	Attack Tree of the Bluetooth Lock:
	
	
6. Nominate one solution for further exploration (in part 2)
           Indicate this on your write-up by the bold text: "FURTHER EXPLORATION"
	In this problem, even if the password used by the user is stolen, the hacker cannot fully open the lock. The lock needs to further verify the identity of the unlocker. Such as face recognition, fingerprint recognition, dynamic verification code, and so on. In this case, even if the password of the lock is inadvertently leaked, the safe use of the lock can still be guaranteed, and the security of the user's property is guaranteed. But the multi-factor authentication still has its own shortages. For example, if the user’s finger is wet, it is hard for the machine to recognize the user’s identity.

