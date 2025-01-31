// docs/cloud.docs.ts
export const cloudDocs = {
    schemas: {
      Cloud: {
        type: "object",
        required: ["image", "filter", "answer"],
        properties: {
          id: {
            type: "string",
            description: "Auto-generated unique identifier"
          },
          image: {
            type: "string",
            format: "base64",
            description: "Base64 encoded cloud image"
          },
          filter: {
            type: "string",
            format: "base64",
            description: "Base64 encoded filter image"
          },
          answer: {
            type: "string",
            description: "Title/description of what the user sees in the cloud"
          },
          userId: {
            type: "string",
            description: "ID of the user who created the cloud"
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
      "/api/clouds": {
        post: {
          summary: "Create a new cloud drawing with its filter",
          tags: ["Clouds"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["image", "filter", "answer"],
                  properties: {
                    image: {
                      type: "string",
                      format: "base64",
                      description: "Base64 encoded cloud image"
                    },
                    filter: {
                      type: "string",
                      format: "base64",
                      description: "Base64 encoded filter image"
                    },
                    answer: {
                      type: "string",
                      description: "Title/description of what the user sees in the cloud"
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: "Cloud created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Cloud"
                  }
                }
              }
            },
            400: {
              description: "Invalid input or upload error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: "Not authorized"
            }
          }
        },
        get: {
          summary: "Get all clouds",
          tags: ["Clouds"],
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "limit",
              schema: {
                type: "integer"
              },
              description: "Number of clouds to return"
            }
          ],
          responses: {
            200: {
              description: "List of clouds",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Cloud"
                    }
                  }
                }
              }
            },
            401: {
              description: "Not authorized"
            }
          }
        }
      },
      "/api/clouds/{id}": {
        get: {
          summary: "Get a cloud by ID",
          tags: ["Clouds"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string"
              },
              description: "Cloud ID"
            }
          ],
          responses: {
            200: {
              description: "Cloud details",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Cloud"
                  }
                }
              }
            },
            404: {
              description: "Cloud not found"
            }
          }
        }
      }
    }
  };