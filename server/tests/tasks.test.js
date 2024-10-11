describe('Tasks', () => {
    
    describe('GET All Tasks', () => {
        
        describe('Given tasks do not exists', () => {
            
            it('Should return a 200 code', () => {

            });

            it('Should return an empty collection of tasks', () => {

            });
        });

        describe('Given tasks do exist', () => {

            it('Should a return a 200 code', () => {

            });

            it('Should return a collection of valid tasks', () => {

            });
        });
    });

    describe('GET Task with ID', () => {

        describe('Given task with ID does not exist', () => {

            it('Should return a 400 code', () => {

            });

            it('Should return an error message stating task does not exist', () => {

            });
        });

        describe('Given task with ID does exist', () => {

            describe('Given request does not have a valid JWT Token', () => {

                it('Should return a 401 code', () => {

                });

                it('Should return an error message stating request does not have authentication', () => {

                });
            });

            describe('Given request does have a valid JWT Token', () => {

                it('Should return a 200 code', () => {
                    
                });

                it('Should return a valid task matching ID', () => {

                });

            });
        });
    });

    describe('POST Create New Task', () => {
        
        describe('Given request does not have a valid JWT Token', () => {
            
            it('Should return a 401 code', () => {

            });

            it('Should return an error message stating request does not have authentication', () => {

            });

        });

        describe('Given request does have a valid JWT Token', () => {

            describe('Given request does not provide a body of params', () => {

                it('Should return a 400 code', () => {

                });

                it('Should return an error message stating request did not provide params', () => {

                });
            });

            describe('Given request does not provide the proper number of params', () => {
                
                it('Should return a 400 code', () => {

                });

                it('Should return an error message stating request did not provide the specified number of params', () => {

                });
            });

            describe('Given request does not provide valid params', () => {
                
                describe('Given request has malformed description', () => {
                   
                    describe('Given request has empty description', () => {
                        
                        it('Should return a 400 code', () => {

                        });

                        it('Should return an error message stating tasks must have a non-empty description', () => {

                        });
                    });

                    describe('Given request has a description exceeding maximum length', () => {

                        it('Should return a 400 code', () => {

                        });

                        // TODO: What is the maximum length?
                        it('Should return an error message stating task description has exceed maximum length of ???', () => {

                        });
                    });
                });

                describe('Given request has a malformed priority', () => {
                    
                    describe('Given request has empty priority', () => {

                        it('Should return a 400 code', () => {

                        });

                        it('Should return an error message stating tasks must have a non-empty priority', () => {

                        });
                    });

                    describe('Given request has a priority of non-existent type', () => {
                        
                        it('Should return a 400 code', () => {

                        });

                        it('Should return an error message stating priority must be an existing priority type', () => {

                        });
                    });
                });

                describe('Given request has a malformed due date', () => {

                    describe('Given request has an empty date', () => {

                        it('Should return a 400 code', () => {

                        });

                        it('Should return an error message stating tasks must have a due date', () => {

                        });
                    });

                    describe('Given request has an incorrectly formed date', () => {

                        it('Should return a 400 code', () => {

                        });

                        it('Should return an error message stating tasks must have a properly formed due date', () => {

                        });
                    });

                    describe('Given request has a date that has already passed', () => {

                        it('Should return a 400 code', () => {
                            
                        });

                        it('Should return an error message stating tasks must have a due date that has not already occurred', () => {

                        });
                    });

                describe('Given request has a malformed occurrence', () => {
                
                    describe('Given request has an empty occurrence', () => {
                    
                        it('Should return a 400 code', () => {

                        });

                        it('Should return an error message stating tasks must have a non-empty occurrence', () => {

                        });
                    });

                    describe('Given request has a non-matching occurrence type', () => {
                        
                        it('Should return a 400 code', () => {

                        });

                        it('Should return an error message stating tasks must have a valid occurrence type', () => {

                        });
                    });
                });

                describe('Given request has a non-existing userID', () => {
                    
                    it('Should return a 400 code', () => {
                    
                    });

                    it('Should return an error message stating that no user exists for userID', () => {

                    });
                });
            });

            describe('Given request is a valid Task', () => {
                
                it('Should return a 200 code', () => {

                });

                it('Should return a valid Task object', () => {

                });
            });
        });
    });
    });
});
