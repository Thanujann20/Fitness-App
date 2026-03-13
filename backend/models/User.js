import mongoose from "mongoose"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

const userSchema = new mongoose.Schema({
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }
})

// Hash password before saving it
userSchema.pre("save", async function (next) {
		if (!this.isModified("password")) {
				return next()
		}
		try {
				const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
				this.password = hash;
				next()
		} catch (err) {
				
		}
})

// Compare provided password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
		return bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model("User", userSchema);