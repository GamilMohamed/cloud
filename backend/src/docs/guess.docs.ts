// docs/guess.docs.ts
export const guessDocs = {
  schemas: {
    Guess: {
      type: "object",
      required: ["answer", "filter", "cloudId", "userId"],
      properties: {
        id: {
          type: "string",
          description: "Auto-generated unique identifier"
        },
        answer: {
          type: "string",
          description: "User's guess about what they see in the cloud"
        },
        filter: {
          type: "string",
          description: "URL of the uploaded filter image"
        },
        cloudId: {
          type: "string",
          description: "ID of the related cloud"
        },
        userId: {
          type: "string",
          description: "ID of the user who made the guess"
        },
        createdAt: {
          type: "string",
          format: "date-time",
          description: "Creation timestamp"
        }
      }
    }
  },
  paths: {
    "/api/guess": {
      get: {
        summary: "Get all guesses",
        tags: ["Guess"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "List of all guesses",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Guess"
                  }
                }
              }
            }
          },
          400: {
            description: "Error retrieving guesses"
          }
        }
      },
      post: {
        summary: "Create a new guess",
        tags: ["Guess"],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["cloudId", "answer", "filter"],
                properties: {
                  cloudId: {
                    type: "string",
                    description: "ID of the cloud being guessed"
                  },
                  answer: {
                    type: "string",
                    description: "User's guess about what they see"
                  },
                  filter: {
                    type: "string",
                    format: "binary",
                    description: "Filter image file"
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Guess created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    guess: {
                      $ref: "#/components/schemas/Guess"
                    },
                    cloud: {
                      $ref: "#/components/schemas/Cloud"
                    }
                  }
                }
              }
            }
          },
          400: {
            description: "Error creating guess"
          }
        }
      }
    },
    "/api/guess/:id": {
      get: {
        summary: "Get a guess by ID",
        tags: ["Guess"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string"
            },
            description: "Guess ID"
          }
        ],
        responses: {
          200: {
            description: "Guess details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Guess"
                }
              }
            }
          },
          400: {
            description: "Error retrieving guess"
          },
          401: {
            description: "Not authorized"
          }
        }
      }
    },
    "/api/guess/cloud/:cloudId": {
      get: {
        summary: "Get every guesses for a given cloud ID",
        tags: ["Guess"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "cloudId",
            required: true,
            schema: {
              type: "string"
            },
            description: "Cloud ID"
          }
        ],
        responses: {
          200: {
            description: "Guess for the specified cloud",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Guess"
                }
              }
            }
          },
          400: {
            description: "Error retrieving guess"
          },
          401: {
            description: "Not authorized"
          }
        }
      }
    }
  }
};