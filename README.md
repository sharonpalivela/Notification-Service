#  Notification Service Using RabbitMQ

A scalable and fault-tolerant notification service built with Node.js and RabbitMQ. This project demonstrates the use of message queues for asynchronous processing, reliable delivery with retry mechanisms, and clean architecture — key skills for modern backend development.

---

## Project Overview

This service simulates a real-world notification system where messages are produced and sent to a queue, then consumed and processed asynchronously. It handles transient failures by retrying message processing up to three times before discarding, ensuring robustness without clogging the system.

Key highlights:  
- Reliable message queue integration using RabbitMQ  
- Asynchronous producer-consumer model  
- Retry and error handling mechanism  
- Modular, maintainable code structure  

---

## Tech Stack

- **Node.js**: Fast, event-driven runtime for backend development  
- **RabbitMQ**: Powerful open-source message broker for decoupled architecture  
- **amqplib**: Official RabbitMQ client for Node.js for seamless integration

---

## Project Structure

server.js – Entry point of the application

.env – Environment variables (excluded via .gitignore)

package.json – Project dependencies and scripts

README.md – Documentation

.gitignore – Git ignore rules

src/

config/ – MongoDB connection config

controllers/ – Business logic for notification handling

models/ – Mongoose schema for notifications

queues/ – Contains producer.js and consumer.js for RabbitMQ

routes/ – Express.js API route definitions


---

##  How It Works

1. **Producer (`producer.js`)**  
   Sends notification messages to the RabbitMQ `notifications` queue.

2. **Consumer (`consumer.js`)**  
   Listens for messages from the queue, processes each notification, and acknowledges successful handling.

3. **Retry Logic**  
   If processing fails (simulated randomly here), the consumer retries up to three times per message. Beyond this, the message is discarded to avoid indefinite retries.

---

## Setup & Usage

### Prerequisites

- RabbitMQ server running locally (management UI available at [http://localhost:15672](http://localhost:15672))  
- Node.js installed (v14+ recommended)

### Steps to Run

1. **Create RabbitMQ user with management permissions:**

```bash
rabbitmqctl add_user sharonp pushpamma
rabbitmqctl set_user_tags sharonp management
rabbitmqctl set_permissions -p / sharonp ".*" ".*" ".*"

2. **Install dependencies:**
npm install amqplib

3. **Start the consumer:**
node src/queues/consumer.js

4. **Run the producer to send a sample notification:**
node src/queues/producer.js

What This Demonstrates:
1.Practical use of message queues to decouple services and enable scalable systems
2.Implementation of retry mechanisms to build fault tolerance in asynchronous processing
3.Strong understanding of Node.js event-driven architecture and RabbitMQ messaging patterns
4.Clean and modular code following best practices for maintainability

Thank you for reviewing this project. I’m excited about the opportunity to contribute and learn further through this internship. 

Note: User credentials provided here are for local testing purposes only and should be secured in production.
