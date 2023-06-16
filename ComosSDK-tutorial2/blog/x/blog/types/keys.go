package types

const (
	// ModuleName defines the module name
	ModuleName = "blog"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_blog"

	//This prefix will be used to uniquely identify a post within the system.
	PostKey = "Post/value/"

	//This key will be used to keep track of the ID of the latest post added to the store.

	PostCountKey = "Post/count/"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
