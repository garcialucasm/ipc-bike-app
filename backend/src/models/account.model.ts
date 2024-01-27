interface Account {
    user: {
        id?: number;
        name?: string,
        email: string,
        password?: string,
        isActive?: Boolean,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    }
    token?: string,
}

export { Account }

