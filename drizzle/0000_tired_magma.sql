CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`country` text NOT NULL,
	`street_address` text NOT NULL,
	`whatsapp` text NOT NULL,
	`email` text NOT NULL,
	`subtotal` real NOT NULL,
	`shipping_cost` real NOT NULL,
	`grand_total` real NOT NULL,
	`status` text DEFAULT 'pending',
	`payment_method` text DEFAULT 'bank_transfer' NOT NULL,
	`payment_status` text DEFAULT 'pending' NOT NULL,
	`stripe_session_id` text,
	`created_at` text
);
